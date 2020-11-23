# 2020 한이음 ICT 멘토링 프로보노 - Yakpago팀  
1. 노약자를 위한 약국/의약품 ML기반 알리미서비스 (약국/병원정보)  
2. 정보소외계층을 위한 머신러닝 기반 맞춤형 일반의약품 추천 서비스    

## 주요 기능  
1. Java Spring을 활용한 약품 상세정보, 약국 상세정보 openAPI 데이터 적재.  
2. 머신러닝 기반 맞춤형 의약품 추천 서비스.  
3. Python Flask를 활용하여 웹서비스 제작.  

## :mag_right: 페이지 소개  
__:paperclip: 메인페이지__  
<img src="https://user-images.githubusercontent.com/66666533/99935381-ec299780-2da3-11eb-949e-0564ced4d52b.png" width="1000" height="250">  
<img src="https://user-images.githubusercontent.com/66666533/99935443-0bc0c000-2da4-11eb-8392-ea3eef2579da.png" width="1000" height="250">
메인페이지. yakpago 서비스에 대한 설명, 진단하기를 클릭하면 사용자가 건강 상태를 입력할 수 있는 페이지로 이동.  
<br>
__:paperclip: 사용자 입력 페이지__  
<img src="https://user-images.githubusercontent.com/66666533/99935616-64905880-2da4-11eb-9bdb-62a81d3dc302.png" width="1000" height="250">
사용자가 원하는 약품 카테고리와 나이, 기저질환, 복용약품, 임신여부를 입력하는 페이지.  
<br>
__:paperclip: 결과페이지 출력 이전 페이지__  
<img src="https://user-images.githubusercontent.com/66666533/99935779-d668a200-2da4-11eb-83ff-486ced46e18f.png" width="1000" height="250">
결과페이지를 출력하는 위치에서 입력데이터가 들어오지 않았을 때 초기 화면.  
<br>
__:paperclip: 결과페이지__  
<img src="https://user-images.githubusercontent.com/66666533/99935876-0fa11200-2da5-11eb-9cda-47e1100db359.png" width="1000" height="250">  
사용자의 입력값을 기반으로 머신러닝 모델이 추천하는 약품을 출력하는 결과 페이지. 약품 이름, 약품 이미지, 성상(약품 모양), 효과, 제조회사, 보관방법, 유효기간를 보여줌. 화살표를 클릭하면 더 많은 추천 약품을 확인할 수 있음.  
<br>
__:paperclip: 지도페이지__  
<img src="https://user-images.githubusercontent.com/66666533/99936013-6d355e80-2da5-11eb-9a1b-67c1846a7c95.png" width="1000" height="250">  
현재 위치를 기반으로 주변의 약국을 보여주는 map 페이지. 마커를 클릭하면 약국이름, 약국 주소, 전화번호 등 상세 정보를 추가로 확인할 수 있음.  
## :computer:Technology  
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
[박민지]  
[최보리]  
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