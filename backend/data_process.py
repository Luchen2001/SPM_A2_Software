import json
from pathlib import Path

class AidDataManager:
    def __init__(self, filename):
        self.filename = Path(f"database/{filename}")
        self.data = self.load_data()

    def load_data(self):
        if Path(self.filename).is_file():
            with open(self.filename, 'r') as f:
                try:
                    return json.load(f)
                except json.JSONDecodeError:
                    return []
        else:
            return []

    def save_data(self):
        with open(self.filename, 'w') as f:
            json.dump(self.data, f, indent=4)

    def update_data(self, aid_data):
        self.data.append(aid_data)
        self.save_data()

    def get_data(self):
        return self.data


class AidRecipientManager(AidDataManager):
    def __init__(self, filename='aid_recipient_data.json'):
        super().__init__(filename)


class AidDonorManager(AidDataManager):
    def __init__(self, filename='aid_donor_data.json'):
        super().__init__(filename)


class AidOrganizationManager(AidDataManager):
    def __init__(self, filename='aid_organization_data.json'):
        super().__init__(filename)

class AidCategoryManager(AidDataManager):
    def __init__(self, filename='aid_category_data.json'):
        super().__init__(filename)


class AidKitManager(AidDataManager):
    def __init__(self, filename='aid_kit_data.json'):
        super().__init__(filename)

class AidItemManager(AidDataManager):
    def __init__(self, filename='aid_item_data.json'):
        super().__init__(filename)

class RequestKitManager(AidDataManager):
    def __init__(self, filename='requested_kit.json'):
        super().__init__(filename)

class RequestByCategoryManager(AidDataManager):
    def __init__(self, filename='requested_by_category.json'):
        super().__init__(filename)

class ReceivedAidItemsManager(AidDataManager):
    def __init__(self, filename='received_aid_items.json'):
        super().__init__(filename)