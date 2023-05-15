import os

# Specify the directory where your code files are located
directory = 'D:\\projects\web\Full-Stack-Admin'
exclude_folders=['node_modules','.git','dist']
exclude_files=['.gitignore','package.json','package-lock.json']

# Iterate through all the files in the directory
for root, _, files in os.walk(directory):
  folder_name = os.path.basename(root)
  if any(exclude_folder in root for exclude_folder in exclude_folders):
      continue
  for filename in files:
    # Get the file path
    if filename in exclude_files:
      continue
    file_path = os.path.join(root, filename)
    
    # Count the number of lines in the file
    if filename.endswith(('.js', '.jsx', '.css', '.html', 'json')):
      # Count the number of lines in the file      
      with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
          line_count = sum(1 for _ in f)
      
      # Check if the file has more than 300 lines
      if line_count > 300:
          print(f'{file_path} has more than 300 lines: {line_count} lines')
      # else:
      #     print(f'{file_path} has {line_count} lines, which is within the limit')

