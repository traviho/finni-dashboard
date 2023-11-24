import json

with open("names.txt", "r") as file:
    names = file.readlines()

with open("birthdays.txt", "r") as file:
    birthdays = file.readlines()

with open("statuses.txt", "r") as file:
    statuses = file.readlines()

with open("addresses.txt", "r") as file:
    addresses = file.readlines()

data = []
for i in range(100):
    obj = {"name": names[i].strip(), "birthday": birthdays[i].strip(), "status": statuses[i].strip(), "address": addresses[i].strip()}
    data.append(obj)
document = {"data": data}

with open("patient_data.json", "w+") as file:
    json.dump(document, file)
