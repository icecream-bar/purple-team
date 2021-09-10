import json
import requests
from shodan import Shodan

api = Shodan('mTNrVaJdNSdF86u7YSLacH0diQtGaMBs')

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
#with open('store.json') as file:
#    json_data = json.load(file)
#r = json.dumps(json_data, indent=2)
#print(r)

with open('store.json') as json_file:
    data = json.load(json_file)
#print(type(data))
#print(str(data))
json_object = json.dumps(data, indent = 4) 
#print(json_object)
for criteria in data['ip_str']:
    for key, value in criteria.iteritems():
        print (key, 'is:', value)
    print ('')

