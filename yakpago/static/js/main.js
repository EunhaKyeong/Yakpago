var medicine_names = new Array();

//입력페이지 Dynamic Select box 구현을 위한 javascript 함수
function insertSubcategories() {
    var category_select = document.getElementById('input_category');
    var subcategory_select = document.getElementById('input_subcategory');

    var category = category_select.value;
    
    fetch ('/subcategory/' + category).then(function(response) {
        response.json().then(function(data) {
        let optionHTML = '';
        optionHTML += "<option value='subcategory_all'>모두 선택" + "</option>";
        for (let subcategory of data) {
            optionHTML += "<option value='" + subcategory.subcategory + "'>" + subcategory.subcategory + "</option>";
        }
        subcategory_select.innerHTML = optionHTML;
        });
    });
}

//입력페이지 약품명 검색하여 약품 이름을 프론트에서 표로 보여주는 javascript 함수
document.getElementById('search_medicine').onclick = function() {
    let input_medicine = document.getElementById('input_medicine').value;
    let medicine_table = document.getElementById('medicine_table');

    fetch('/input/' + input_medicine).then(function(response) {
        response.json().then(function(data) {
            let index = 1;
            let optionHTML = '';
            for (let medicine of data) {
                optionHTML += "<tr> <th scope='row'>" + index + "</th> <td class='td_medicine' value='" + medicine + "'>" + medicine + "</td> </tr>";
                index += 1;
            }
            medicine_table.innerHTML = optionHTML;
        });
    });
    
    return false;
}

//입력페이지 약품명 입력 부분 동적 이벤트 구현 함수(+form input 태그에 약품 이름 넣어주는 함수).
document.getElementById('medicine_table').onmouseover = function() {
    let td_medicines = document.getElementsByClassName('td_medicine');

    for (let i=0; i<td_medicines.length; i++) {
        td_medicines[i].onclick = function() {
            if (this.style.backgroundColor == "") {
                this.style.backgroundColor = '#5cb85c';
                this.style.color = 'white';
                medicine_names.push(this.outerText);
            }
            else {
                this.style.backgroundColor = '';
                this.style.color = 'black';
                const index = medicine_names.indexOf(this.outerText);
                if (index > -1) 
                    medicine_names.splice(index, 1);
            }
        }
    }
    document.getElementById('input_ingredients').value = medicine_names;
}

function check(val, re) {
    if(re.test(val)) {
        return true;
    }
    else {
        return false;
    }
}

//입력페이지 체중값 유효성 검사 함수
document.getElementById('input_weight').onkeyup = function() {
    let input_age = document.getElementById('input_weight');

    if (!check(input_age.value, /[0-9]/)) {
        document.getElementById('weigt_reg').style.display = "block";
    }
    else {
        document.getElementById('weigt_reg').style.display = "none";
    }
};

//입력페이지 submit 버튼 클릭했을 때 유효성 검사 후 에러를 alert하고 에러입력텍스트로 focus 하는 함수.
document.getElementById('input_page_button').onclick = function() {
    let input_age = document.getElementById('input_age');
    let input_weight = document.getElementById('input_weight')
    medicine_names = [];
    if (input_weight.value=="") {
        alert("체중은 필수 사항입니다.");
        input_weight.focus();
        return false;
    }
    if (input_weight.value!="" & !check(input_weight.value, /[0-9]/)) {
        alert("체중은 숫자만 입력 가능합니다.")
        input_weight.focus();
        return false;
    }
};

let click = 0;

window.onload = result_medicine(click);

document.getElementsByClassName('glyphicon glyphicon-chevron-right')[0].onclick = function() {
    click++;
    result_medicine(click);
};

document.getElementsByClassName('glyphicon glyphicon-chevron-left')[0].onclick = function() {
    click--;
    if (click<0) {
        click = 0;
    }
    result_medicine(click);
};

//결과페이지 추천 약품 모델을 보여주는 함수.(페이지 로딩 첫 화면)
function result_medicine(click) {
    fetch('/result').then(function(response) {
        response.json().then(function(data) {
            let last_index = data.length;
            if (click==parseInt(last_index/3)) {
                document.getElementsByClassName('btn btn-secondary')[1].style.visibility = "hidden";
            }
            else {
                document.getElementsByClassName('btn btn-secondary')[1].style.visibility = "visible";
            }
            for (let i=3*click; i<3*(click+1); i++) {
                console.log(i);
                if (i>=last_index) {
                    document.getElementsByClassName('col-md-4')[i%3].style.visibility = "hidden";
                    continue;
                }
                else {
                    document.getElementsByClassName('col-md-4')[i%3].style.visibility = "visible";
                }
                //item_name
                document.getElementsByClassName('panel-heading')[i%3].getElementsByTagName('p')[0].innerHTML = data[i].item_name;
                if (document.getElementsByClassName('text-center item-name')[i%3].textContent.length>17) {
                    document.getElementsByClassName('panel-heading')[i%3].style.height="50px";
                    document.getElementsByClassName('text-center item-name')[i%3].style.fontSize="13px";
                    document.getElementsByClassName('text-center item-name')[i%3].style.height="28.44px";
                }
                else {
                    document.getElementsByClassName('text-center item-name')[i%3].style.fontSize="20px";
                }
                //image
                if (data[i].image_url!=null) {
                    document.getElementsByClassName('no_image')[i%3].style.display="none";
                    document.getElementsByClassName('panel-body medicine-image')[i%3].getElementsByTagName('img')[0].src=data[i].image_url;
                    document.getElementsByClassName('panel-body medicine-image')[i%3].getElementsByTagName('img')[0].style.display="block";
                }
                else {
                    document.getElementsByClassName('panel-body medicine-image')[i%3].getElementsByTagName('img')[0].style.display="none";
                    document.getElementsByClassName('no_image')[i%3].style.display="block";
                }
                //entp_name
                let entp_name = data[i].entp_name;
                document.getElementsByClassName('list-group-item entp-name')[i%3].innerHTML =  entp_name;
                //storage_method
                let storage_method = data[i].storage_method;
                if (storage_method == null) {
                    document.getElementsByClassName('list-group-item storage-method')[i%3].style.height = "42px";
                }
                else if (storage_method.length <= 25) {
                    document.getElementsByClassName('list-group-item storage-method')[i%3].innerHTML = storage_method;
                }
                else {
                    document.getElementsByClassName('list-group-item storage-method')[i%3].innerHTML = storage_method.substr(0, 22) + "...<span class='more'> ▼</span>";
                    document.getElementsByClassName('list-group-item storage-method')[i%3].innerHTML += "<div class='bubble'>" + storage_method + "</div>";
                    document.getElementsByClassName('list-group-item storage-method')[i%3].getElementsByClassName('more')[0].onclick = function() {
                        if (document.getElementsByClassName('list-group-item storage-method')[i%3].getElementsByClassName('more')[0].textContent==' ▼') {
                            document.getElementsByClassName('list-group-item storage-method')[i%3].getElementsByClassName('bubble')[0].style.display = 'block';
                            document.getElementsByClassName('list-group-item storage-method')[i%3].getElementsByClassName('more')[0].innerHTML = ' ▲';
                        }
                        else {
                            document.getElementsByClassName('list-group-item storage-method')[i%3].getElementsByClassName('bubble')[0].style.display = 'none';
                            document.getElementsByClassName('list-group-item storage-method')[i%3].getElementsByClassName('more')[0].innerHTML = ' ▼';
                        }
                    };
                }
                //valid_term
                let valid_term = data[i].valid_term;
                if (valid_term == null) {
                    document.getElementsByClassName('list-group-item valid-term')[i%3].innerHTML = "";
                    document.getElementsByClassName('list-group-item valid-term')[i%3].style.height = "42px";
                }
                else if (valid_term.length <= 25) {
                    document.getElementsByClassName('list-group-item valid-term')[i%3].innerHTML = valid_term;
                }
                else {
                    document.getElementsByClassName('list-group-item valid-term')[i%3].innerHTML = valid_term.substr(0, 22) + "...<span class='more'> ▼</span>";
                    document.getElementsByClassName('list-group-item valid-term')[i%3].innerHTML += "<div class='bubble'>" + valid_term + "</div>";
                    document.getElementsByClassName('list-group-item valid-term')[i%3].getElementsByClassName('more')[0].onclick = function() {
                        if (document.getElementsByClassName('list-group-item valid-term')[i%3].getElementsByClassName('more')[0].textContent==' ▼') {
                            document.getElementsByClassName('list-group-item valid-term')[i%3].getElementsByClassName('bubble')[0].style.display = 'block';
                            document.getElementsByClassName('list-group-item valid-term')[i%3].getElementsByClassName('more')[0].innerHTML = ' ▲';
                        }
                        else {
                            document.getElementsByClassName('list-group-item valid-term')[i%3].getElementsByClassName('bubble')[0].style.display = 'none';
                            document.getElementsByClassName('list-group-item valid-term')[i%3].getElementsByClassName('more')[0].innerHTML = ' ▼';
                        }
                    };
                }
                //chart
                let chart = data[i].chart;
                if (chart == null) {
                    document.getElementsByClassName('list-group-item chart')[i%3].innerHTML = "";
                    document.getElementsByClassName('list-group-item chart')[i%3].style.height = "42px";
                }
                else if (chart.length <= 25) {
                    document.getElementsByClassName('list-group-item chart')[i%3].innerHTML = chart;
                }
                else {
                    document.getElementsByClassName('list-group-item chart')[i%3].innerHTML = chart.substr(0, 22) + "...<span class='more'> ▼</span>";
                    document.getElementsByClassName('list-group-item chart')[i%3].innerHTML += "<div class='bubble'>" + chart + "</div>";
                    document.getElementsByClassName('list-group-item chart')[i%3].getElementsByClassName('more')[0].onclick = function() {
                        if (document.getElementsByClassName('list-group-item chart')[i%3].getElementsByClassName('more')[0].textContent==' ▼') {
                            document.getElementsByClassName('list-group-item chart')[i%3].getElementsByClassName('bubble')[0].style.display = 'block';
                            document.getElementsByClassName('list-group-item chart')[i%3].getElementsByClassName('more')[0].innerHTML = ' ▲';
                        }
                        else {
                            document.getElementsByClassName('list-group-item chart')[i%3].getElementsByClassName('bubble')[0].style.display = 'none';
                            document.getElementsByClassName('list-group-item chart')[i%3].getElementsByClassName('more')[0].innerHTML = ' ▼';
                        }
                    };
                }
                //effect
                let effect = data[i].effect;
                console.log(effect)
                if (effect == null) {
                    document.getElementsByClassName('list-group-item effect')[i%3].innerHTML = "";
                    document.getElementsByClassName('list-group-item effect')[i%3].style.height = "42px";
                }
                else if (effect.length <= 25) {
                    document.getElementsByClassName('list-group-item effect')[i%3].innerHTML = effect;
                }
                else {
                    document.getElementsByClassName('list-group-item effect')[i%3].innerHTML = effect.substr(0, 22) + "...<span class='more'> ▼</span>";
                    document.getElementsByClassName('list-group-item effect')[i%3].innerHTML += "<div class='bubble'>" + effect + "</div>";
                    document.getElementsByClassName('list-group-item effect')[i%3].getElementsByClassName('more')[0].onclick = function() {
                        if (document.getElementsByClassName('list-group-item effect')[i%3].getElementsByClassName('more')[0].textContent==' ▼') {
                            document.getElementsByClassName('list-group-item effect')[i%3].getElementsByClassName('bubble')[0].style.display = 'block';
                            document.getElementsByClassName('list-group-item effect')[i%3].getElementsByClassName('more')[0].innerHTML = ' ▲';
                        }
                        else {
                            document.getElementsByClassName('list-group-item effect')[i%3].getElementsByClassName('bubble')[0].style.display = 'none';
                            document.getElementsByClassName('list-group-item effect')[i%3].getElementsByClassName('more')[0].innerHTML = ' ▼';
                        }
                    };
                }
            }
        });
    });
    
    return false;
};

