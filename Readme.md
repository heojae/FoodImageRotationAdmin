### Food Image Rotation Admin

이 레포의 목적은 `Food Image Rotation(음식이미지 회전)`이라는 주제에 대해서. 

실제로 `딥러닝(deeplearning)`을 어떻게 도입하고, 이를 `API(backend)`로서 서버에 올리며, `웹(frontend)` 를 통해서 올리는 과정을 구현하기 위해서 만든 프로젝트입니다.

`자동 음식 회전`이라는 `API` 를 만들고, 이 `API` 를 `관리자(Admin)` 가 웹을 통해서 관리하는 것을 구현할 것입니다.

[시안 디자인 링크](https://github.com/heojae/FoodImageRotationAdmin/issues/1)



--------------

#### 기술 스택

- ##### Design

  [FIGMA](https://www.figma.com/) 를 통해서, 웹 화면의 대략적인 디자인을 구현할 생각입니다.  

  [시안 디자인 링크](https://github.com/heojae/FoodImageRotationAdmin/issues/1)

- #### DeepLearning

  - `pytorch`

- ##### Frontend

  - `React` 
  - `Redux`

- ##### Backend

  - `MSA(MicroService Architecture) -> `(`user`, `model version`, `dl(model inference 용)`, `dataset`)

  - `python` ->  `asyncio`, `grpc` 등등을 활용하여, 구현할 예정입니다. 
  - `sqlAlchemy `

- ##### Backend 와 FrontEnd 통신

  - `GRPC`  -> [https://grpc.io/](https://grpc.io/)


