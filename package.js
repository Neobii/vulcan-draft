Package.describe({
  name: 'neobii:vulcan-draft-core',
});

Package.onUse(function (api) {

  api.use([

    // vulcan core
    'vulcan:core@1.12.9',

    // vulcan packages
    'vulcan:forms@1.12.9',
    
  ]);
  
  api.mainModule('lib/DraftField.jsx', 'server');
  api.mainModule('lib/DraftField.jsx', 'client');

});
