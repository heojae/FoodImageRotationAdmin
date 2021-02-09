### DeepLearning 

`Food Image Roation` 의 딥러닝 부분을 구현하였습니다. 

##### 참조 링크

[Food Image Rotation Task 선정의 이유](https://github.com/heojae/FoodImageRotationAdmin/issues/2)

[데이터의 분류와 클래스 선정의 이유 정리](https://github.com/heojae/FoodImageRotationAdmin/issues/3)

[딥러닝 모델의 선택](https://github.com/heojae/FoodImageRotationAdmin/issues/4)

[데이터 전처리 및 생성 방법](https://github.com/heojae/FoodImageRotationAdmin/issues/5)

[학습 결과 정리 - cpu, single gpu, multi gpu(data parallel, custom data parallel, distributed parallel, apex)](https://github.com/heojae/FoodImageRotationAdmin/issues/7)



--------

`efficient-b0` 를 기본으로 구현되어 있으며, 

`Food Image Rotate` 의 학습을 다양한 환경에서 학습 가능하도록, 각 환경마다 `train _~~.py` 를 만들어 두었습니다. 



[당근 마켓, pytorch multi gpu 학습 제대로 하기](https://medium.com/daangn/pytorch-multi-gpu-학습-제대로-하기-27270617936b) 

[학습 결과 정리 - cpu, single gpu, multi gpu(data parallel, custom data parallel, distributed parallel, apex)](https://github.com/heojae/FoodImageRotationAdmin/issues/7)

을 기반으로 하여, 작성되었습니다. 



아래 파일들은 모두 `argparser` 를 통해서, 구현해두었으므로, 파일 내부를 참조해서, 값을 변경하여 사용하시길 바랍니다. 

- `train_cpu_only.py`

  GPU 없이, CPU 만으로 학습하는 코드입니다. 

  ```sh
  python train_cpu_only.py
  ```



- `train_single_gpu.py`

  한개의 `gpu` 만으로, 학습하는 코드입니다 . 

  ```
  python train_single_gpu.py
  ```



- `train_data_parallel.py`

  `DataParallel` 을 활용하여, `multi gpu` 를 사용하여 학습하는 코드입니다. 

  ```
  python train_data_parallel.py
  ```



- `train_data_parallel_seperate.py`

  `DataParallel` 을 `Custom`하여, `Loss` 와 `back propagation`, `grad` 등의 연산 및 메모리를 각각의 `GPU`위에서, 

   `multi gpu` 를 사용하여 학습하는 코드입니다. 

  ```
  python train_data_parallel_seperate.py
  ```



- `train_distributed_data_parallel.py`

  `DistributedDataParallel` 을 활용하여, 각각의 프로세스로, 학습을 돌리는 코드이며, 동일한 메모리를 각 GPU 위에 할당합니다. 

  ```
  python train_distributed_data_parallel.py
  ```



- `train_apex_distributed_data_parallel.py`

  `Nvidia Apex` 를 활용하여, 학습을 하는 코드이며, 

  [https://github.com/NVIDIA/apex](https://github.com/NVIDIA/apex) 을 기반으로, 환경설정을 할 필요가 있습니다. 

  ```
  python train_apex_distributed_data_parallel.py
  ```



----------

#### Inference Image

`inference.py` 는 기존에 학습된 모델을  사용하는 방법과, 어떠한 과정이 필요한지, 대략 어떠한 값이 나오는 지 정리하기 위한 부분입니다.

올린 모델 또한, 학습데이터가 많은 편이 아니라, 예측과는 다른 결과 값을 낼 수 있으니, 참고해주세요. 

```shell
python inference.py

# 현재 각도 : 90 , 수정 필요 각도 : 270, confidence : 0.9944472312927246 , exif_degree : 90
```



------------

#### 서버 환경 

- OS : Ubuntu 18.04
- CUDA : 10.2
- CUDDN : 8.0.4
- Nvidia Driver : nvidia-driver-440-server



