#### User Server 



##### 참고 이슈

[DL Server 설계 및 구상도](https://github.com/heojae/FoodImageRotationAdmin/issues/27)



- Proto 파일들 생성하기

  프로젝트의 `proto/` 에 위치하기 때문에, 파일의 `import` 경로를 수정해야합니다. 

   (`proto` 를 추가해두어야 한다.  ),  `import proto.empty_pb2 as empty__pb2`

```sh
sh run_proto_gen 
```





- 서버 동작시키기

  아래와 같이 동작을 시키면 `localhost:50052` 에서 돌아가고 있는 중이고, 서버는 정상적으로 돌아가고 있습니다. 

```sh
sh run_server
# python app.py
```

