myApp.controller('InventoryController', ['UserService', 'InventoryService', function (UserService, InventoryService) {
    console.log('InventoryController created');
    let self = this;
    self.userService = UserService;
    self.inventoryService = InventoryService;
}]);
