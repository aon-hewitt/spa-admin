/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here.
    // For complete reference see:
    // http://docs.ckeditor.com/#!/api/CKEDITOR.config

    // The toolbar groups arrangement, optimized for two toolbar rows.
    config.toolbarGroups = [
		{ name: 'clipboard', groups: ['clipboard', 'undo'] },
		{ name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document', groups: ['mode', 'document', 'doctools'] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
		{ name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
	];

    // Remove some buttons provided by the standard plugins, which are
    // not needed in the Standard(s) toolbar.
    config.removeButtons = 'Underline,Subscript,Superscript';

    // Set the most common block elements.
    config.format_tags = 'p;h1;h2;h3;pre';

    // Simplify the dialog windows.
    config.removeDialogTabs = 'image:advanced;link:advanced';


    var environmentString = location.hostname;
    if (environmentString == "f2472b6e-e1f1-4c52-9eed-f7797ff8e908-hosted.cloudcms.net") {
        config.contentsCss = ['/ckeditor/bootstrap.css', '/css/custom.css'];
    } else {
        config.contentsCss = ['/secure-bsc-admin/ckeditor/bootstrap.css', '/secure-bsc-admin/css/custom.css'];

    }


    //local version:
    //config.contentsCss = ['/secure-bsc-admin/ckeditor/bootstrap.css', '/secure-bsc-admin/css/custom.css'];

    //CloudCMS hosted version:
    //config.contentsCss = ['/ckeditor/bootstrap.css', '/css/custom.css'];


    config.height = '600px';
};
