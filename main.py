with open('test.txt', 'a') as file:
  for i in range(1, 605):
    file.write(f"""--font-q{i}: 'qcf_p{i}';\n""")

