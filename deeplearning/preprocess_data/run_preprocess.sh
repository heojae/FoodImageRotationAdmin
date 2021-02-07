python rename.py --dir_path ../data/before_rotate
python make_rotated_images.py --before_dir_path ../data/before_rotate --save_dir_path ../data/after_rotate
python make_csv.py --after_rotate_dir_path ../data/after_rotate \
                   --save_train_csv_path ../train.csv \
                   --save_test_csv_path ../test.csv \
