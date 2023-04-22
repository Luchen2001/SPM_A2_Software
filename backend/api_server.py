# api_server.py
import json

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from data_process import (
    AidRecipientManager,
    AidDonorManager,
    AidOrganizationManager,
    AidCategoryManager,
    AidKitManager,
    AidItemManager,
    RequestKitManager,
    RequestByCategoryManager,
    ReceivedAidItemsManager
)

app = FastAPI()
origins = [
    "http://localhost:3000",
    "localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
default_categories = []
with open ('default_categories.js', 'r') as f:
    default_categories =  json.load(f)
with open ('database/aid_category_data.json', 'w') as f:
    json.dump(default_categories, f, indent=4)

recipient_manager = AidRecipientManager()
donor_manager = AidDonorManager()
organization_manager = AidOrganizationManager()
category_manager = AidCategoryManager()
kit_manager = AidKitManager()
item_manager = AidItemManager()
requested_kit = RequestKitManager()
requested_by_category = RequestByCategoryManager()
received_aid_items = ReceivedAidItemsManager()

@app.get('/')
async def root():
    return {'name': 'api to connect to react'}

@app.get('/data/recipients')
async def get_recipient_data():
    return recipient_manager.get_data()

@app.post('/update/recipients')
async def update_recipient_data(request: Request):
    aid_recipient = await request.json()
    recipient_manager.update_data(aid_recipient)
    return {'message': 'Recipient data updated'}

@app.get('/data/donors')
async def get_donor_data():
    return donor_manager.get_data()

@app.post('/update/donors')
async def update_donor_data(request: Request):
    aid_donor = await request.json()
    donor_manager.update_data(aid_donor)
    return {'message': 'Donor data updated'}

@app.get('/data/organizations')
async def get_organization_data():
    return organization_manager.get_data()

@app.post('/update/organizations')
async def update_organization_data(request: Request):
    aid_organization = await request.json()
    organization_manager.update_data(aid_organization)
    return {'message': 'Organization data updated'}

@app.get('/data/categories')
async def get_category_data():
    return category_manager.get_data()

@app.post('/update/categories')
async def update_category_data(request: Request):
    aid_category = await request.json()
    category_manager.update_data(aid_category)
    return {'message': 'Category data updated'}

@app.get('/data/kits')
async def get_kit_data():
    return kit_manager.get_data()

@app.post('/update/kits')
async def update_kit_data(request: Request):
    aid_kit = await request.json()
    kit_manager.update_data(aid_kit)
    return {'message': 'Kit data updated'}

@app.get('/data/aid_items')
async def get_aid_item_data():
    return item_manager.get_data()

@app.post('/update/aid_items')
async def update_aid_item_data(request: Request):
    aid_item = await request.json()
    item_manager.update_data(aid_item)
    return {'message': 'Aid item data updated'}

@app.post('/data/request_kit')
async def get_aid_item_data():
    return requested_kit.get_data()

@app.post('/update/request_kit')
async def update_request_aid_data(request: Request):
    request_kit = await request.json()
    requested_kit.update_data(request_kit)
    return {'message': 'Request aid data updated'}

@app.get('/data/request_by_category')
async def get_request_by_category_data():
    return requested_by_category.get_data()

@app.post('/update/request_by_category')
async def update_request_by_category_data(request: Request):
    request_by_category = await request.json()
    requested_by_category.update_data(request_by_category)
    return {'message': 'Request by category data updated'}

@app.get('/data/receive_aid_items')
async def get_received_aid_items_data():
    return received_aid_items.get_data()

@app.post('/update/receive_aid_items')
async def update_received_aid_items_data(request: Request):
    received_aid_item = await request.json()
    received_aid_items.update_data(received_aid_item)
    return {'message': 'Received aid items data updated'}