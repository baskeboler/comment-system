(function() {
    angular.module('comments', ['ngResource', 'vcRecaptcha', 'ui.tinymce', 'ngSanitize']);

    angular.module('comments')
        .factory('Comment', Comment)
        .factory('SiteComments', SiteComments)
        .controller('CommentCtrl', CommentCtrl);
    SiteComments.$inject = ['$resource'];
    Comment.$inject = ['$resource'];
    CommentCtrl.$inject = ['Comment', 'SiteComments', '$log'];

    function CommentCtrl(Comment, SiteComments, $log) {
        $log.info('Inside CommentCtrl');
        var vm = this;
        vm.comment = {
            body: 'Write something',
            page: 'testing-site/comments'
        };
        vm.tinymceOptions = {
            // onChange: function(e) {
            //     // put logic here for keypress and cut/paste changes
            // },
            inline: false,
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools'
            ],
            toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'print preview media | forecolor backcolor emoticons',
            skin: 'lightgray',
            theme: 'modern'
        };
        vm.save = save;
        vm.remove = remove;
        // vm.comments = Comment.query({});
        vm.loadAll = loadAll;
        activate();

        function activate() {
            vm.loadAll();
        }
        function remove(c) {
          Comment.remove({id: c._id}).$promise.then(vm.loadAll);
        }
        function save() {
            var obj = angular.copy(vm.comment);
            obj['g-recaptcha-response'] = obj.recaptchaResponse;
            delete obj.recaptchaResponse;
            $log.info('request object is ' + JSON.stringify(obj));
            Comment.save(obj).$promise.then(function(res) {
                $log.info('saved successfully!');
                $log.info(JSON.stringify(res));
                vm.loadAll();
            }).catch(function(err) {
                $log.error('there was an error!');
                $log.error(JSON.stringify(err));
            });
        }

        function loadAll() {
            SiteComments.getComments('testing-site/comments')
                .then(function(comments) {
                    vm.comments = comments;
                });
        }
    }

    function SiteComments($resource) {
        return {
            getComments: getSiteComments
        };

        function getSiteComments(pageId) {
            return $resource('/comments/page/:pageId/comments', {
                pageId: pageId
            }, {
                query: {
                    method: 'GET',
                    isArray: true
                }
            }).query({}).$promise;
        }
    }

    function Comment($resource) {
        return $resource('/comments/:id', null, {
            'get': {
                method: 'GET'
            },
            'save': {
                method: 'POST'
            },
            'query': {
                method: 'GET',
                isArray: true
            },
            'remove': {
                method: 'DELETE'
            },
            'delete': {
                method: 'DELETE'
            }
        });
    }
})();
