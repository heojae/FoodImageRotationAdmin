import os
from typing import List
import pandas as pd


def search_for_csv_list(after_rotate_dir_path: str, train_or_test="train") -> List[List[str]]:
    train_or_text_data_set_path = os.path.join(after_rotate_dir_path, train_or_test)
    degree_dir_names = os.listdir(train_or_text_data_set_path)
    if ".DS_Store" in degree_dir_names:
        degree_dir_names.remove(".DS_Store")

    result_list: List[List[str]] = []
    for degree_dir_name in degree_dir_names:
        file_names = os.listdir(os.path.join(train_or_text_data_set_path, degree_dir_name))

        if ".DS_Store" in file_names:
            file_names.remove(".DS_Store")

        for file_name in file_names:
            result_list.append([train_or_test, degree_dir_name, file_name])

    degree_dir_name_and_file_name_list = sorted(result_list, key=lambda result_list: result_list[2])
    return degree_dir_name_and_file_name_list


if __name__ == "__main__":
    after_rotate_dir_path = "/Users/shrldh3576/Desktop/FiraAdmin/code/ic-ai_fira/train/data/after_rotate"

    train_csv_list = search_for_csv_list(after_rotate_dir_path=after_rotate_dir_path,
                                         train_or_test="train")

    test_csv_list = search_for_csv_list(after_rotate_dir_path=after_rotate_dir_path,
                                        train_or_test="test")

    df = pd.DataFrame(train_csv_list, columns=["train_or_test", 'degree_dir_name', 'iamge_name'])
    df.to_csv('./../train.csv', index=False)

    df = pd.DataFrame(test_csv_list, columns=["train_or_test", 'degree_dir_name', 'iamge_name'])
    df.to_csv('./../test.csv', index=False)
