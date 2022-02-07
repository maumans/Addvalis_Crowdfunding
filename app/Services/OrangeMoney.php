<?php

namespace App\Services;

class OrangeMoney
{
    private $merchant_key;
    private $currency;
    private $return_url;
    private $notif_url;
    private $cancel_url;
    private $lang;
    private $reference;

    private $config = [];
    private $data = [];

    private $init_url = 'http://apis.kagnot.org/api/om/init';
    private $check_url = 'http://apis.kagnot.org/api/om/check';

    public function __construct($config = [])
    {
        $required_params = [
            'merchant_key', 'currency',
            'cancel_url', 'return_url', 'notif_url', 'reference',
            'lang', 'header_authorization',
        ];
        $not_found = [];
        /*
        foreach ($required_params as $p) {
            if (!array_key_exists($p, $config)) {
                array_push($not_found, $p);
            } else {
                $this->$p = $config[$p];
            }
        }
        */

        if (!empty($not_found)) {
            throw new \Exception(json_encode($not_found).' sont requis');
            die('paramètres sont nécessaire');
        } else {
            $this->config = $config;
        }
    }

    public function initPaiement($amount = null)
    {
        if (!($amount > 0)) {
            throw new \Exception('Le montant est requis');
        }
        $config = $this->config;
        $data = $this->config;
        $data['amount'] = $amount;
        $this->data = $data;
        return $this->post($this->init_url);
    }

    public function checkPaiement($order_id, $amount, $pay_token)
    {
        $data = $this->config;
        $data['order_id'] = $order_id;
        $data['amount'] = $amount;
        $data['pay_token'] = $pay_token;
        $this->data = $data;

        return $this->post($this->check_url);
    }

    public function post($url)
    {
        $options = [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_FOLLOWLOCATION => 1,
            CURLOPT_VERBOSE => 1,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_FOLLOWLOCATION => 1,
            CURLOPT_POST => 1,
            CURLOPT_POSTFIELDS => $this->data,
            CURLOPT_VERBOSE => 1,
            CURLOPT_HTTPHEADER => [],
        ];


        $curl = curl_init();
        curl_setopt_array($curl, $options);
        $r = curl_exec($curl);

        curl_close($curl);
        return $r;
    }
}
