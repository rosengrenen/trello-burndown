# trello-burndown

A simple application that fetches data from a trello board in regular intervals and presents a burndown

## Requirements

* Docker
* Docker compose

## Running

### Environment variables

Copy example file

```
cp .env.example .env
```

Fill in fields in .env

### Development

```
docker-compose up -d
```

### Production

```
docker-compose -f docker-compose.prod.yml up -d
```

### Docker swarm (production)

```
docker stack deploy -c <(docker-compose -f docker-stack.yml config) trello-burndown
```

## Building

```
docker-compose -f docker-compose.prod.yml --parallel build && docker-compose -f docker-compose.prod.yml push
```
