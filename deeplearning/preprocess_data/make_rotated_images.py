import os
import random
import PIL
from PIL import Image


def save_before_rotate_images_to_after_rotate_images(before_dir_path: str = "", save_dir_path: str = ""):
    before_rotate_filenames = os.listdir(before_dir_path)
    if ".DS_Store" in before_rotate_filenames:
        before_rotate_filenames.remove(".DS_Store")

    for before_rotate_filename in before_rotate_filenames:
        before_rotate_file_path = os.path.join(before_dir_path, before_rotate_filename)
        try:
            before_rotate_image: PIL.Image.Image = Image.open(before_rotate_file_path)
        except PIL.UnidentifiedImageError:
            continue

        if random.randint(1, 100) > 10:
            train_or_test = "train"
        else:
            train_or_test = "test"

        save_path_0 = os.path.join(save_dir_path, train_or_test, "degree_0", before_rotate_filename)
        save_path_90 = os.path.join(save_dir_path, train_or_test, "degree_90", before_rotate_filename)
        save_path_180 = os.path.join(save_dir_path, train_or_test, "degree_180", before_rotate_filename)
        save_path_270 = os.path.join(save_dir_path, train_or_test, "degree_270", before_rotate_filename)
        rotated_and_resize_and_save_image(image=before_rotate_image, degree=0, size=224, save_path=save_path_0)
        rotated_and_resize_and_save_image(image=before_rotate_image, degree=90, size=224, save_path=save_path_90)
        rotated_and_resize_and_save_image(image=before_rotate_image, degree=180, size=224, save_path=save_path_180)
        rotated_and_resize_and_save_image(image=before_rotate_image, degree=270, size=224, save_path=save_path_270)


def rotated_and_resize_and_save_image(image: PIL.Image.Image, degree: int = 0, size: int = 224, save_path: str = ""):
    rotated_image = image.rotate(degree, expand=True)
    resized_image = rotated_image.resize((size, size))
    resized_image.save(save_path)


if __name__ == "__main__":
    before_dir_path1 = "/Users/shrldh3576/Desktop/FiraAdmin/code/ic-ai_fira/train/data/before_rotate"
    save_dir_path1 = "/Users/shrldh3576/Desktop/FiraAdmin/code/ic-ai_fira/train/data/after_rotate"
    save_before_rotate_images_to_after_rotate_images(before_dir_path=before_dir_path1,
                                                     save_dir_path=save_dir_path1)
