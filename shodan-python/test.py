import json
import requests
from shodan import Shodan

api = Shodan('TOKENAPI')

response = api.search(query='IIS')

#Write json response to json file
with open('store.json', 'w') as file:
    json.dump(response, file)

#Read json file and apply fomat
#with open('store.json', 'r') as j:
#    json_data = json.load(j)
#    #print(json_data)
#    for i in json_data['_shodan']:
#        print(i)
#    j.close()

#Read json file and apply fomat
with open('store.json') as file:
    json_data = json.load(file)
r = json.dumps(json_data, indent=2)
print(r)

#for i in r:
#    print (i[""])
