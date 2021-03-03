#### DL Server 



##### 참고 이슈

[DL Server 설계 및 구상도](https://github.com/heojae/FoodImageRotationAdmin/issues/27)

[Docker 를 통한 컨테이너화](https://github.com/heojae/FoodImageRotationAdmin/issues/44)



-----------

#### Docker mode

`config.py` 에서, 아래 둘 중 하나를 선택해서, `dev` 와 `docker(prod)` 를 선택할 수 있습니다.  

```python
# settings = Settings() # Dev 
settings = DockerSettings() # Docker(prod)
```





-------------------------

#### Dev mode

- Proto 파일들 생성하기

  `~~~.proto`  를 활용해서,  생성을 하고, 

  프로젝트의 `proto/` 에 위치하기 때문에, 파일의 `import` 경로를 수정해야합니다. 

   (`proto` 를 추가해두어야 한다.  ),  `import proto.empty_pb2 as empty__pb2`

```sh
sh run_proto_gen 
```



- 서버 동작시키기

  아래와 같이 동작을 시키면 `localhost:50052` 에서 돌아가고 있는 중이고, 서버는 정상적으로 돌아가고 있습니다. 

  아래 서버는 동작 시키기 전에,  `user server` 와 `model version server` 이 두개 모두 동작하고 있어야합니다. 

```sh
python app.py
```