> 대주제 : Dataset Info Server 의 설계와 각각의 API 들의 설정이유들을 명시하고 싶다. 
>
> 소주제 : db 설계 와 활용한 라이브러리들을 정리하고 싶다. 



##### 참고 이슈

[User Server 설계 및 구상도](https://github.com/heojae/FoodImageRotationAdmin/issues/16)

[Model Version Server 설계 및 구상도](https://github.com/heojae/FoodImageRotationAdmin/issues/18)

[DL Server 설계 및 구상도](https://github.com/heojae/FoodImageRotationAdmin/issues/27)

[Dataset Server 설계 및 구상도](https://github.com/heojae/FoodImageRotationAdmin/issues/29)

------------------



#### API 설명

아래 API 모두, `Service-Side Interceptor` 를 활용해서,

https://grpc.github.io/grpc/python/grpc.html#service-side-interceptor

`user server - authenticate` 에게 요청을 보내서, 유저 인증을 하게 됩니다.

- ##### GetDatasetInfoList

  모든 `DatasetInfo` 의 정보를 들고 온다. 

- ##### GetImageInfoList

  전체 `ImageInfo` 정보들을 들고온다. 

- ##### GetChooseImageInfoList

  선택된, `Dataset pk` 에 포함되는, `Image Info` 들의 정보를 들고 온다. 

- ##### CreateDatasetInfo

  새로운 `DatasetInfo` 를 생성한다. 

  기존의 `untrained` Dataset 을 -> 새로운 이름을 주어주고, 

  아예 또 새로운 `untrained` Dataset 을 생성하여, 무에서 시작한다. 

- ##### RemoveImage

  해당 `image info pk` 의 `ImageInfo` 를 삭제한다. 

- ##### SaveUserFixImage

  `model` 이 잘못 예측한, 이미지에 대한 정보와 `user`가 수정한 정보를 담아서, 그에 대한 정보를 함께 저장합니다. 

  이는 `media` 폴더에 저장하게 될 예정이며, `media server` 를 통해서, 접근이 가능합니다. 



------

#### DB 설계도

아래와 같이,  2개의 테이블로 이루어져있으며, 기본적인 정보들만, 포함하고 있습니다.
[erdcloud](https://www.erdcloud.com/library) 를 활용하여 그렸습니다.

(사진)

------------------------

#### Media Server

`python http.server` 를 활용하여, 이미지와 같은 파일들을 간편하게, 접근할 수 있는 `media server` 를 구현하였습니다. 

`Media server` 동작시키기

아래를 `media` 폴더에서 동작 시키면, `Front` 에서도,  `media`폴더 내부에 있는 파일에 접근할 수 있습니다. 

```shell
cd media
python -m http.server 50050 &
# http://localhost:50050/admin/profile.jpg
```



------------------------

#### 



#### 라이브러리

아래에서, 거의 동일한 라이브러리를 활용해서, 구현하였습니다. 

[User Server 설계 및 구상도](https://github.com/heojae/FoodImageRotationAdmin/issues/16)

[Model Version Server 설계 및 구상도](https://github.com/heojae/FoodImageRotationAdmin/issues/18)

[DL Server 설계 및 구상도](https://github.com/heojae/FoodImageRotationAdmin/issues/27)



- `aiofiles`

  이를 활용하여, `async` 하게, `os` 관련 작업들을 할 수 있었습니다. 

  [https://pypi.org/project/aiofiles/](https://pypi.org/project/aiofiles/)













> 대주제 : Dataset Info Server 의 설계와 각각의 API 들의 설정이유들을 명시하고 싶다. 
>
> 소주제 : db 설계 와 활용한 라이브러리들을 정리하고 싶다. 



##### 참고 이슈

[User Server 설계 및 구상도](https://github.com/heojae/FoodImageRotationAdmin/issues/16)

[Model Version Server 설계 및 구상도](https://github.com/heojae/FoodImageRotationAdmin/issues/18)

[DL Server 설계 및 구상도](https://github.com/heojae/FoodImageRotationAdmin/issues/27)

[Dataset Server 설계 및 구상도](https://github.com/heojae/FoodImageRotationAdmin/issues/29)

------------------



#### API 설명

아래 API 모두, `Service-Side Interceptor` 를 활용해서,

https://grpc.github.io/grpc/python/grpc.html#service-side-interceptor

`user server - authenticate` 에게 요청을 보내서, 유저 인증을 하게 됩니다.

- ##### GetDatasetInfoList

  모든 `DatasetInfo` 의 정보를 들고 온다. 

- ##### GetImageInfoList

  전체 `ImageInfo` 정보들을 들고온다. 

- ##### GetChooseImageInfoList

  선택된, `Dataset pk` 에 포함되는, `Image Info` 들의 정보를 들고 온다. 

- ##### CreateDatasetInfo

  새로운 `DatasetInfo` 를 생성한다. 

  기존의 `untrained` Dataset 을 -> 새로운 이름을 주어주고, 

  아예 또 새로운 `untrained` Dataset 을 생성하여, 무에서 시작한다. 

- ##### RemoveImage

  해당 `image info pk` 의 `ImageInfo` 를 삭제한다. 

- ##### SaveUserFixImage

  `model` 이 잘못 예측한, 이미지에 대한 정보와 `user`가 수정한 정보를 담아서, 그에 대한 정보를 함께 저장합니다. 

  이는 `media` 폴더에 저장하게 될 예정이며, `media server` 를 통해서, 접근이 가능합니다. 



------

#### DB 설계도

아래와 같이,  2개의 테이블로 이루어져있으며, 기본적인 정보들만, 포함하고 있습니다.
[erdcloud](https://www.erdcloud.com/library) 를 활용하여 그렸습니다.

(사진)

------------------------

#### Media Server

`python http.server` 를 활용하여, 이미지와 같은 파일들을 간편하게, 접근할 수 있는 `media server` 를 구현하였습니다. 

`Media server` 동작시키기

아래를 `media` 폴더에서 동작 시키면, `Front` 에서도,  `media`폴더 내부에 있는 파일에 접근할 수 있습니다. 

```shell
cd media
python -m http.server 50050 &
# http://localhost:50050/admin/profile.jpg
```



------------------------

#### 



#### 라이브러리

아래에서, 거의 동일한 라이브러리를 활용해서, 구현하였습니다. 

[User Server 설계 및 구상도](https://github.com/heojae/FoodImageRotationAdmin/issues/16)

[Model Version Server 설계 및 구상도](https://github.com/heojae/FoodImageRotationAdmin/issues/18)

[DL Server 설계 및 구상도](https://github.com/heojae/FoodImageRotationAdmin/issues/27)



- `aiofiles`

  이를 활용하여, `async` 하게, `os` 관련 작업들을 할 수 있었습니다. 

  [https://pypi.org/project/aiofiles/](https://pypi.org/project/aiofiles/)







