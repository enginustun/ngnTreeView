/*ngnTreeView*/
(function ($) {
    /**/
    var methods = {
        init: function (options) {
            var defaults = {
                animate: true,
                openAnimationSpeed: 600,
                closeAnimationSpeed: 600,
                openAnimation: 'swing',
                closeAnimation: 'swing',
                callbacks: {
                    opening: function (elem) {
                        var parentElement = $(this).parents('[id*="ngn-treeview"]'),
                            clickedText = $('a', this).text();
                        $('.tree-view-processes ul').prepend('<li>' + clickedText + ' opening... <strong><span class="label label-warning">callbacks.opening</span> <span class="label label-danger">id: (' + parentElement.attr('id') + ')</span></strong></li>');
                    },
                    opened: function (elem) {
                        var parentElement = $(this).parents('[id*=ngn-treeview]'),
                            clickedText = $('a', this).text();
                        $('.tree-view-processes ul').prepend('<li>' + clickedText + ' opened! <strong><span class="label label-warning">callbacks.opened</span> <span class="label label-danger">id: (' + parentElement.attr('id') + ')</span></strong></li>');
                    },
                    closing: function (elem) {
                        var parentElement = $(this).parents('[id*=ngn-treeview]'),
                            clickedText = $('a', this).text();
                        $('.tree-view-processes ul').prepend('<li>' + clickedText + ' closing... <strong><span class="label label-warning">callbacks.closing</span> <span class="label label-danger">id: (' + parentElement.attr('id') + ')</span></strong></li>');
                    },
                    closed: function (elem) {
                        var parentElement = $(this).parents('[id*=ngn-treeview]'),
                            clickedText = $('a', this).text();
                        $('.tree-view-processes ul').prepend('<li>' + clickedText + ' closed! <strong><span class="label label-warning">callbacks.closed</span> <span class="label label-danger">id: (' + parentElement.attr('id') + ')</span></strong></li>');
                    },
                    hasNoItem: function (elem) {
                        var parentElement = $(this).parents('[id*=ngn-treeview]'),
                            clickedText = $('a', this).text();
                        $('.tree-view-processes ul').prepend('<li>There is no member to be shown under ' + clickedText + ' title. <strong><span class="label label-warning">callbacks.hasNoItem</span> <span class="label label-danger">id: (' + parentElement.attr('id') + ')</span></strong></li>');
                    },
                    linkClicked: function (elem) {
                        var parentElement = $(elem).parents('[id*=ngn-treeview]'),
                            clickedText = $(elem).text();
                        $('.tree-view-processes ul').prepend('<li>' + clickedText + ' clicked! <strong><span class="label label-warning">callbacks.linkClicked</span> <span class="label label-danger">id: (' + parentElement.attr('id') + ')</span></strong></li>');
                    }
                },
            }

            return this.each(function () {
                options = $.extend(true, defaults, options);
                if (!(options.animate)) {
                    options.openAnimationSpeed = 0;
                    options.closeAnimationSpeed = 0;
                }
                var $this = $(this);
                if (!$(document).data('ngn-treeview-index')) {
                    $(document).data('ngn-treeview-index', '1');
                } else {
                    var ngnWSIndex = parseInt($(document).data('ngn-treeview-index'));
                    $(document).data('ngn-treeview-index', ngnWSIndex + 1);
                }
                $this.attr('id', 'ngn-treeview-' + $(document).data('ngn-treeview-index'));
                $this.on('click', 'li div', function (e) {
                    var self = this;
                    if (($(e.target).is('li')) || ($(e.target).is('div'))) {
                        var isOpen = !$(self).closest('li').hasClass('dd-close'),
                         hasItem = $('+ul li', self).size() > 0;
                        if (hasItem) {
                            if (!isOpen) {
                                options.callbacks.opening.call(self, self);
                                //
                                $('>ul', $(self).closest('li')).stop(null, true, true).slideDown(options.openAnimationSpeed, options.openAnimation, function () {
                                    options.callbacks.opened.call(self, self);
                                    $(self).closest('li').removeClass('dd-close');
                                });
                            }
                            else {
                                options.callbacks.closing.call(self, self);
                                //
                                $('>ul', $(self).closest('li')).stop(null, true, true).slideUp(options.closeAnimationSpeed, options.closeAnimation, function () {

                                    options.callbacks.closed.call(self, self);
                                    $(self).closest('li').addClass('dd-close');
                                });
                            }
                        }
                        else {
                            options.callbacks.hasNoItem.call(self, self);
                        }
                    }
                });

                $this.on('click', 'li div a', function (e) {
                    options.callbacks.linkClicked.call(this, this);
                });

                $this.data({
                    'init': true
                });
            });
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------------------------------*/
    $.fn.ngnTreeView = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist");
        }
    };
})(jQuery);
//----------------------------------------------------------------