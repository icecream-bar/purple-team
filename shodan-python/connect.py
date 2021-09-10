from shodan import Shodan

api = Shodan('TOKENAPI')

# Lookup an IP
#ipinfo = api.host('8.8.8.8')
#print(ipinfo)

# Search for websites that have been "hacked"
for banner in api.search_cursor('http.title:"IIS"'):
    print(banner)

# Get the total number of industrial control systems services on the Internet
#ics_services = api.count('tag:ics')
#print('Industrial Control Systems: {}'.format(ics_services['total']))

