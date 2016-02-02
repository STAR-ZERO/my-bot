My Bot
===

## Installation

```
$ npm install forever -g
$ npm install
```

## Setup

#### Slack token

Add slack token to system environment variables.

See [botkit getting started](https://github.com/howdyai/botkit#getting-started).

#### Slack channel

Add channel `info` for job notifications.

## Usage

#### Start

```
$ npm start
```

#### Stop

```
$ npm stop
```

## Bot

### ping/pong

```
@bot: ping
```

![ping-pong](image/ping-pong.png)

### Update bot

```
@bot: update bot
```

![update](image/update.png)

### Weather forecasts

```
@bot weather [today|tommorow]
```

![weather](image/weather.png)

## Job

* notify weather forecasts to 7:00
* notify trash collection schedule to 0:00
