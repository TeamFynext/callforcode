import urllib, json
import urllib2
config = {
 #your_configuration_details
}

url = "http://fynesaver.eu-gb.mybluemix.net/getdata"
response = urllib.urlopen(url)
data = json.loads(response.read())
#print data

result = []
for item in data:
    my_dict={}
    #my_dict['title']=item.get('labels').get('en').get('value')
    #my_dict['description']=item.get('descriptions').get('en').get('value')
    my_dict['_id']=item.get('_id')
    my_dict['_rev']=item.get('_rev')
    my_dict['id']=item.get('id')
    my_dict['ack']=item.get('ack')
    my_dict['name']=item.get('name')  
    my_dict['Address']=item.get('Address')
    my_dict['lat']=item.get('lat')
    my_dict['lng']=item.get('lng')
    my_dict['phno']=item.get('phno')    
  #  print my_dict.get('ack')
    result.append(my_dict)

users = db.child("users").get()
#print(users.val()) 

#for x in users.each():
 #   print(x.key(), x.val())

for item in data:
    for x in users.each():
      #print item.get('name').lower()+" and "+x.key().lower()  
      if((x.val()==1)and(item.get('name').lower()==x.key().lower())):
          #print "matchfound"
          print item.get('name')+" needs help"      
          response = urllib2.urlopen('https://fynesaver.eu-gb.mybluemix.net/updata?_id='+item.get('_id')+
          '&_rev='+item.get('_rev')+'&id='+item.get('id')+'&ack=1&name='+item.get('name')+
          '&Address='+item.get('Address')+'&lat='+item.get('lat')+'&lng='+item.get('lng')+'&phno='+item.get('phno'))
          html = response.read()
      
      elif((x.val()==0)and(item.get('name').lower()==x.key().lower())):
          #print "nomatchfound"
          #print item      
          responsea = urllib2.urlopen('https://fynesaver.eu-gb.mybluemix.net/updata?_id='+item.get('_id')+
          '&_rev='+item.get('_rev')+'&id='+item.get('id')+'&ack=0&name='+item.get('name')+
          '&Address='+item.get('Address')+'&lat='+item.get('lat')+'&lng='+item.get('lng')+'&phno='+item.get('phno'))
          html = responsea.read()  
       
          