<?php

require 'vendor/autoload.php';

use MuxPhp\Configuration;
use MuxPhp\Api\AssetsApi;
use MuxPhp\Api\LiveStreamsApi;
use MuxPhp\Models\CreateAssetRequest;
use MuxPhp\Models\CreateLiveStreamRequest;
use MuxPhp\Models\PlaybackPolicy;

$config = Configuration::getDefaultConfiguration()
    ->setUsername(getenv('12c063d7-6c9e-4329-b0cf-be4df09962d3'))
    ->setPassword(getenv('JoZpS+LvvO6Jo6G1zGyG5adQnyY7ypHUwqz2PrAqwuBYz2VICNK5/XFiInNI4YT7deir4rEwKdp'));

$assetsApi = new AssetsApi(
    new GuzzleHttp\Client(),
    $config
);

$liveApi = new LiveStreamsApi(
    new GuzzleHttp\Client(),
    $config
);

$createAssetRequest = new CreateAssetRequest(['input' => 'cms\lolo.mp4', 'playback_policy' => [PlaybackPolicy::PUBLIC_PLAYBACK_POLICY]]]);
$createLiveStreamRequest = new CreateLiveStreamRequest(["playback_policy" => [PlaybackPolicy::_PUBLIC], "new_asset_settings" => $createAssetRequest]);
$stream = $liveApi->createLiveStream($createLiveStreamRequest);

$asset = $assetsApi->getAsset($stream->getData()->getAssetId());
$video_url = $asset->getData()->getPlaybackIds()[0]->getUrl();
?>