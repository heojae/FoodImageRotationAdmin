import argparse
import os


def rename_files(dir_path):
    files = os.listdir(dir_path)
    files.sort()
    count = 0
    for file in files:
        count += 1
        file_path = os.path.join(dir_path, file)
        os.rename(file_path, os.path.join(dir_path, str(count) + ".jpg"))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--dir_path', type=str, default="../data/before_rotate", help='dir_path of changing file names')
    args = parser.parse_args()

    rename_files(dir_path=args.dir_path)
