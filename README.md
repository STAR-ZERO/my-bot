My Bot
===

## Installation

```
$ npm install forever -g
$ npm install
```

## Setup

#### Slack token

Add slack token to system env.

See [botkit getting started](https://github.com/howdyai/botkit#getting-started).

#### Slack channel

Add channel 'info' for job notifications.

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

### Weather forecasts

```
@bot weather [today|tommorow]
```

![weather](image/weather.png)

## Job

* notify weather forecasts to 8:00

## Planned features

* notify trash collection schedule.
