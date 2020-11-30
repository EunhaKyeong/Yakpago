# 2020 한이음 ICT 멘토링 프로보노 - Yakpago팀  
1. 노약자를 위한 약국/의약품 ML기반 알리미서비스 (약국/병원정보)  
2. 정보소외계층을 위한 머신러닝 기반 맞춤형 일반의약품 추천 서비스    

## 주요 기능  
1. Java Spring을 활용한 약품 상세정보, 약국 상세정보 openAPI 데이터 적재.  
2. 머신러닝 기반 맞춤형 의약품 추천 서비스.  
3. Python Flask를 활용하여 웹서비스 제작.  

## :mag_right: 페이지 소개  
__:paperclip: 메인페이지__  
<img src="https://user-images.githubusercontent.com/66666533/99935381-ec299780-2da3-11eb-949e-0564ced4d52b.png" width="1000" height="350">  
<img src="https://user-images.githubusercontent.com/66666533/99935443-0bc0c000-2da4-11eb-8392-ea3eef2579da.png" width="1000" height="350">
메인페이지. yakpago 서비스에 대한 설명, 진단하기를 클릭하면 사용자가 건강 상태를 입력할 수 있는 페이지로 이동.  
<br>
__:paperclip: 사용자 입력 페이지__  
<img src="https://user-images.githubusercontent.com/66666533/99935616-64905880-2da4-11eb-9bdb-62a81d3dc302.png" width="1000" height="350">
사용자가 원하는 약품 카테고리와 나이, 기저질환, 복용약품, 임신여부를 입력하는 페이지.  
<br>
__:paperclip: 결과페이지 출력 이전 페이지__  
<img src="https://user-images.githubusercontent.com/66666533/99935779-d668a200-2da4-11eb-83ff-486ced46e18f.png" width="1000" height="350">
결과페이지를 출력하는 위치에서 입력데이터가 들어오지 않았을 때 초기 화면.  
<br>
__:paperclip: 결과페이지__  
<img src="https://user-images.githubusercontent.com/66666533/99935876-0fa11200-2da5-11eb-9cda-47e1100db359.png" width="1000" height="350">  
사용자의 입력값을 기반으로 머신러닝 모델이 추천하는 약품을 출력하는 결과 페이지. 약품 이름, 약품 이미지, 성상(약품 모양), 효과, 제조회사, 보관방법, 유효기간를 보여줌. 화살표를 클릭하면 더 많은 추천 약품을 확인할 수 있음.  
<br>
__:paperclip: 지도페이지__  
<img src="https://user-images.githubusercontent.com/66666533/99936013-6d355e80-2da5-11eb-9a1b-67c1846a7c95.png" width="1000" height="350">  
현재 위치를 기반으로 주변의 약국을 보여주는 map 페이지. 마커를 클릭하면 약국이름, 약국 주소, 전화번호 등 상세 정보를 추가로 확인할 수 있음.  
## :computer:Technology  
| <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1024px-HTML5_logo_and_wordmark.svg.png" width="35" height="35"> | <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png" width="35" height="35"> | <img src="https://post-phinf.pstatic.net/MjAxNzAzMjhfMjYw/MDAxNDkwNjY1NDkxNTkw.X94ztffwPOCDs90nzw1_p9TOTqMuyEKgVw8n8baQb9og.IhyZEkUI_rXZHNQnzFjj3xeUE0sKTnOQQ7dHqdOPdqIg.PNG/Java.png?type=w1200" width="35" height="35"> | <img src="data:image/png;base64,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" width="35" height="35"> | <img src="https://camo.githubusercontent.com/91de473fa3f2f749a56effc3e64f1049d108251f/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f632f63332f507974686f6e2d6c6f676f2d6e6f746578742e7376672f37363870782d507974686f6e2d6c6f676f2d6e6f746578742e7376672e706e67" width="35" height="35"> |  
| --- | --- | --- | --- | --- |  
| HTML | CSS | JAVA | JavaScript| Python |  

:arrow_forward: Java Spring  
:arrow_forward: JavaScript  
:arrow_forward: Python  
:arrow_forward: Python Flask  
:arrow_forward: PostgreSQL  
:arrow_forward: AWS RDS  
:arrow_forward: BootStrap4  
## :two_men_holding_hands::two_women_holding_hands: Team
[경은하](https://github.com/EunhaKyeong)  
[서호진](https://github.com/seohojin99)  
[나동민](https://github.com/skehdxhd96)  
박민지  
최보리  
## URL  
시연 영상 Youtube  
<https://www.youtube.com/watch?v=y0Rc-eujaNY&feature=youtu.be>  
<br><br>

-----------------------------------------------------------------------------------------------------------------
# GitHub 협업 Flow  
__1. Fork & Clone__   
* Fork : 다른 사용자의 원격 저장소에 있는 프로젝트를 내 계정의 원격 저장소로 그대로 가져오는 작업.
<img src="https://user-images.githubusercontent.com/66666533/97833641-2eb60200-1d19-11eb-8dd4-e73f0af8c53f.PNG" width="1000" height="250">  

* Clone : 내 원격 저장소에 있는 프로젝트를 로컬 환경으로 가져오는 작업.  
<img src="https://user-images.githubusercontent.com/66666533/97834048-2dd1a000-1d1a-11eb-929f-841acc583d91.PNG" width="1000" height="250">  

__2.Origin & Upstream__  
* 클론한 프로젝트가 저장되어 있는 파일 경로로 이동.  
```
git remote -v   #현재 로컬 저장소에 등록되어 있는 저장소 목록을 보여줌.
```
* 현재는 원격 저장소의 이름인 **origin**만 출력될 것임.  
* 다른 저장소(프로젝트가 처음 생성된 다른 사용자의 저장소)의 이름을 로컬 저장소에 저장해야 함. 다른 저장소의 이름은 보편적으로 **upstream**을 사용함.  
```
git remote add upstream https://github.com/EunhaKyeong/Yakpago.git  #프로젝트 소유자의 주소
```
__3. Pull Request__  
* Pull Request란 자신이 변경한 내용을 upstream 저장소에 적용시켜 달라고 프로젝트 소유자에게 요청하는 작업.  
* Pull Request를 하기 전에 변경 사항을 자신의 원격 저장소에 add, commit, push를 함.  
```
git add.
git commit -m "내 변경 사항을 내 저장소에 커밋"
git push origin master
```  
* 원격 저장소에 저장한 후에 upstream 저장소로 이동하여 자신의 변경 내용을 pull request 함.  
* 이후 프로젝트 소유자는 변경 사항을 확인 후 이상이 없다면 merge함.(프로젝트 소유자 저장소에 collaborator로 자격을 얻으면 스스로 pull request, merge를 할 수 있음.)  
__3. Fetch & Merge__  
* Fetch : 작업을 시작하기 전 프로젝트에 어떤 변경 사항이 있는지 확인하는 작업.  
```
git fetch upstream
```
* 변경 사항이 없다면 아무런 메세지가 출력되지 않고, 변경 사항이 있으면 메세지가 출력됨.  
* 변경 사항이 있다면 upstream의 변경사항을 자신의 저장소에 병합해야 함.  
```
git merge upstream/master
```