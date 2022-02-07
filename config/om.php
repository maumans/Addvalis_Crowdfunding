<?php

return [
    'header_authorization' => 'Basic QVgxMDNIRmJNUWhTeDVicllQWnoybEVIN1NYOWFKM2E6M3V3OXMwUFg4UmliWFBDYQ==',
    'merchant_key_dev' => '0ab2a34e',
    'merchant_key_prod' => '91fc6ead',
    'mode'=>env('PAIEMENT_MODE', 'dev'),
    'currency' => 'OUV',
    'return_url' => env('HOST', 'http://192.168.1.249:8000').'/om/return',
    'notif_url' => env('HOST', 'http://192.168.1.249:8000').'/om/notif',
    'cancel_url' => env('HOST', 'http://192.168.1.249:8000').'/om/cancel',
    'lang' => 'fr',
    'reference' => 'Addvalis',
];
