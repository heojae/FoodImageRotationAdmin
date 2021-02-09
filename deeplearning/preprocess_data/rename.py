import argparse
import os
from typing import List


def rename_files(dir_path: str):
    files: List[str] = os.listdir(dir_path)
    files.sort()
    count: int = 0

    if ".DS_Store" in files:
        files.remove(".DS_Store")

    for file in files:
        count += 1
        file_path: str = os.path.join(dir_path, file)
        extender: str = file.split(".")[-1]
        if extender.lower() not in ["jpg", "jpeg", "png"]:
            continue

        os.rename(file_path, os.path.join(dir_path, str(count) + "." + extender))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--dir_path', type=str, default="../data/before_rotate", help='dir_path of changing file names')
    args = parser.parse_args()

    rename_files(dir_path=args.dir_path)
