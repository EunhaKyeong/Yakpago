from db_model import postgresql
import numpy as np
import psycopg2
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from konlpy.tag import Kkma

def model(form):
    form_dict = form.to_dict()
    ingredients = []

    category = form_dict['category']
    subcategory = form_dict['subcategory']
    weight = int(form_dict['weight'])
    disease = form_dict['disease']
    form_dict['ingredients'] = list(form_dict['ingredients'].split(','))
    for medicine in form_dict['ingredients']:
        ingredients = list(set(postgresql.select_ingredients(medicine, ingredients)))
    form_dict['ingredients'] = ingredients
    
    if ('pregnant' in form_dict)==False:
            pregnant = False
    else:
        pregnant = True
    print(form_dict)

    #DB연결
    df6=dbconnect()
    df601=dbconnect()

    #카테고리 선택
    df7=casubca(df6,category,subcategory)
    df701=casubca(df601,category,subcategory)

    #임신여부
    df7=pregnant_def(df7, pregnant)

    # 기저질환 유사도
    under_doc, under_list=under(df7,disease)
    global new_df;
    new_df=duplication(under_doc,under_list)
    new_df=new_df.rename({0:'item_seq'},axis=1)

    #복용약품 유사도
    if(ingredients!=[]):
        new2_df=df701['item_seq']

        for ing in ingredients:
            atem_doc,atem_list=atemedic(df701, ing)
            df801=duplication(atem_doc,atem_list)
            df901=df801.rename({0:'item_seq'},axis=1)
            new2_df=pd.concat([new2_df, df901])
            new2_df=pd.merge(df901,new2_df,on='item_seq',how='inner')
        recommend_list= pd.merge(new_df,new2_df,on='item_seq',how='inner')
        return(recommend_list[['item_seq']])
            
    else :
        return(new_df)


def pregnant_def(df7,pregnant):
    if(pregnant==True):
        df8=df7.loc[:,['patient']]
        list7=df8.values.tolist()
        list8=np.array(list7).flatten().tolist()
        pregnant_list=['임신부','임산부','임신','임부']
        list_pre=[]
        for i in range(len(list8)):
            for j in pregnant_list:
                if j in list8[i]:
                    list_pre.append(i)
        a=0
        for i in list_pre:
            df7=df7.drop(df7.index[i+a])
            a=a-1
    return(df7)

def dbconnect():
    #디비연결
    conn_string = "host='yakpago-db-instance.ce3s5gihh4zd.ap-northeast-2.rds.amazonaws.com' dbname ='medicine' user='yakpago' password='yakpago723'port=5432"
    conn = psycopg2.connect(conn_string)
    cur = conn.cursor()
    
    #medicineinfo 테이블 불러와 저장
    cur.execute("SELECT * FROM medicineinfo")
    result = cur.fetchall()
    dfmedicineinfo = pd.DataFrame(result)
    dfmedicineinfo.columns=['item_seq','item_name','entp_name','etc_otc_code','chart','storage_method','valid_term','effect','category','subcategory']
    dfmedicineinfo=dfmedicineinfo.iloc[:,[0,3,7,8,9]]
    
    #prohibit_patient 테이블 불러와 저장
    cur.execute("SELECT * FROM prohibit_patient")
    result = cur.fetchall()
    dfprohibitpatient = pd.DataFrame(result)
    dfprohibitpatient.columns=['prohibit_patient_id','patient','item_seq']
    
    #prohibit_ingredient 테이블 불러와 저장
    cur.execute("SELECT * FROM prohibit_ingredient")
    result = cur.fetchall()
    dfprohibitingredient = pd.DataFrame(result)
    dfprohibitingredient.columns=['prohibit_ingredient_id','prohibit_ingredient','item_seq']
    
    #테이블 item_seq 기준으로 통합
    df1=pd.merge(dfmedicineinfo,dfprohibitpatient,on='item_seq',how='outer')
    df2=pd.merge(df1,dfprohibitingredient,on='item_seq',how='outer')
    
    #결측치 처리(null값 삭제)
    df3=df2.dropna()
    
    #우리는 일반의약품 대상이기 때문에 일반의약품만 뽑아내 저장 후 필요한 컬럼만 추출(제외된 컬럼은 prohibit_patient_id, prohibit_ingredient_id)
    df4=df3[df3['etc_otc_code'].isin(['일반의약품'])]
    df5=df4.iloc[:,[0,1,2,3,4,6,8]]
    
    #중복데이터 삭제
    df6=df5.drop_duplicates()
    return(df6)

def casubca(df6,category,subcategory):
    if (category != 'category_all'):
        if(subcategory == 'subcategory_all'):
            df7=df6[df6['category'].isin([category])]
            return(df7)
        else :
            df7=df6[df6['category'].isin([category])]
            df7=df7[df7['subcategory'].isin([subcategory])]
            return(df7)
    else :
        df7=df6
        return(df7)

def under(df7, disease):
    df8=df7.iloc[:,[0,5]]
    df8=df8.drop_duplicates()
    list=[]
    list=df8.values.tolist()
    doc_list=np.array(list).flatten().tolist()
    new_doc_list=[]
    
    if(disease!=''):
        for i in range(1,len(doc_list),2):
            new_doc_list.append(doc_list[i])

        from konlpy.tag import Kkma
        kkma = Kkma()
        list1=[];list2=[]
        for i in range (1, len(new_doc_list)):
            list1=kkma.nouns(new_doc_list[i])
            list2.append(' '.join(list1))

        tfidf_vect_simple = TfidfVectorizer()
        list2.insert(0,disease)

        feature_vect_simple = tfidf_vect_simple.fit_transform(list2)
        feature_vect_dense = feature_vect_simple.todense()

        similarity_simple_pair = cosine_similarity(feature_vect_simple[0] , feature_vect_simple)

        list3=[];
        for i in range(len(list)):
            if (similarity_simple_pair[0,i] != 0.0):
                list3.append(i)
        return(doc_list, list3)
    else :
        list3=[0]
    return(doc_list,list3)

def duplication(under_doc,under_list):
    list4=[]
    if(len(under_list)==1 and under_list[0]==0):
        new_new_doc_list=under_doc
        for i in range(0,len(new_new_doc_list),2):
            list4.append(new_new_doc_list[i])
        new_df=pd.DataFrame(list4)
        new_df=new_df.drop_duplicates()
        return(new_df)
    else: 
        i=0
        new_new_doc_list=under_doc
        for a in under_list:
            new_new_doc_list.pop(2*a+1-i)
            new_new_doc_list.pop(2*a-i)
            i+=2
        for i in range(0,len(new_new_doc_list),2):
            list4.append(new_new_doc_list[i])

        new_df=pd.DataFrame(list4)
        new_df=new_df.drop_duplicates()
        return(new_df)

def atemedic(df701, ingredients):
    df801=df701.iloc[:,[0,5,6]]
    #('item_seq','patient','prohibit_ingredient_id')

    df801=df801.drop_duplicates()
    list5=[]
    list5=df801.values.tolist()
    doc3_list=np.array(list5).flatten().tolist()
    doc4_list=[]
    
    for i in range(1,len(doc3_list),2):
        doc4_list.append(doc3_list[i])
        
    kkma = Kkma()
    list6=[];list7=[]
    for i in range (1, len(doc4_list)):
        list6=kkma.nouns(doc4_list[i])
        list7.append(' '.join(list6))

    tfidf_vect_simple = TfidfVectorizer()
    list7.insert(0,ingredients)
    
    feature_vect_simple = tfidf_vect_simple.fit_transform(list7)
    feature_vect_dense = feature_vect_simple.todense()
    
    similarity_simple_pair = cosine_similarity(feature_vect_simple[0] , feature_vect_simple)
    
    list8=[];
    for i in range(len(list5)):
        if (similarity_simple_pair[0,i] != 0.0):
            list8.append(i)
    return(doc3_list, list8)