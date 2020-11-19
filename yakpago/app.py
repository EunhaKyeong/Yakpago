from flask import Flask, jsonify, render_template, request
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm
from db_model import postgresql
from model import model
import json
import psycopg2

app = Flask(__name__)
Bootstrap(app)

@app.route('/', methods = ['GET', 'POST'])
def after_input():
    categories = postgresql.select_category()

    conn = psycopg2.connect(host='yakpago-db-instance.ce3s5gihh4zd.ap-northeast-2.rds.amazonaws.com', dbname='pharmacy', user='yakpago', password='yakpago723', port='5432') # db에 접속

    cur = conn.cursor()
    cur.execute("select pharmacy_name, pharmacy_address, pharmacy_tel ,longitude, latitude from pharmacy;")
    ex = cur.fetchmany(22914)
    
    if request.method=='GET':
        return render_template('main.html', data=ex, categories=categories)
    elif request.method=='POST':
        input_form = request.form
        result = postgresql.select_item_names(model.printInputValue(input_form))
        # 머신러닝 모델 실행 후 추천 약품의 item_seq(약품 코드)와 item_name(약품명)을 딕셔너리 형태로 임시로 저장해 놓는 파일 생성.
        with open('static\\results.txt', 'w+t', encoding='utf-8') as f:
            json.dump(result, f, indent="\t", ensure_ascii = False)
        return render_template('main.html', data=ex, categories=categories, scroll='Result')

#입력값 Dynamic Select Box 구현을 위해 필요한 라우팅 경로.
@app.route('/subcategory/<category>')
def subcategory(category):
    subcategories = postgresql.select_subcategory(category)
    subcategoriesArray = []

    for id, subcategory in enumerate(subcategories):
        subcategoryObj = {}
        subcategoryObj['id'] = id+1
        subcategoryObj['subcategory'] = subcategory
        subcategoriesArray.append(subcategoryObj)

    return jsonify(subcategoriesArray)

#입력 페이지에서 약품명 검색 후 테이블에 약품명을 보여주기 위해 필요한 라우팅 경로.
@app.route('/input/<medicine_name>')
def select_medicine(medicine_name):
    names = postgresql.select_medicinename(medicine_name)
    return jsonify(names)

#머신러닝 모델의 추천 결과 약품들의 DB 정보를 json 형태로 저장해놓은 라우팅 경로.
@app.route('/result')
def model_result():
    file_data = ""
    file_dict = {}
    resultsObj = []
    with open("static\\results.txt", "r", encoding='utf-8') as f: 
        file_data = f.read() 
        file_dict = json.loads(file_data)

    resultsDBObj = postgresql.select_result_data(file_dict.keys())

    for index, resultDBObj in enumerate(resultsDBObj):
        resultObj = {}
        resultObj['id'] = index
        resultObj['item_seq'] = resultDBObj[0]
        resultObj['item_name'] = resultDBObj[1]
        resultObj['entp_name'] = resultDBObj[2]
        resultObj['chart'] = resultDBObj[3]
        resultObj['storage_method'] = resultDBObj[4]
        resultObj['valid_term'] = resultDBObj[5]
        resultObj['effect'] = resultDBObj[6]
        resultObj['image_url'] = resultDBObj[7]
        resultsObj.append(resultObj)
    
    return jsonify(resultsObj)

@app.route('/test')
def test_page():
    return render_template("index copy.html")

if __name__ == "__main__":
    app.run(debug=True)