(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController)

    function FlickrImageSearchController(widgetService, flickrService, $routeParams, $location) {
        let model = this;
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];
        model.widgetId = $routeParams["wgid"];
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function searchPhotos (searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    let data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            let url = "https://farm"+photo.farm+".staticflickr.com/"+photo.server;
            url += "/"+photo.id+"_"+photo.secret+"_b.jpg";
            widgetService.findWidgetById(model.widgetId)
                .then(function (response) {
                    return response.data;
                })
                .then(function (widget) {
                    model.widget = widget;
                    model.widget.url = url;
                    widgetService
                        .updateWidget(model.widgetId, model.widget)
                        .then(function (response) {
                            $location.url("user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+model.widgetId);
                        })
                });
        }

    }
})();