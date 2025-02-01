const warnings = [
    'warning.secret.1',
    'warning.secret.2',
    'warning.secret.3',
    'warning.secret.4',
    'warning.secret.5',
    'warning.secret.6',
    'warning.secret.7',
    'warning.secret.8',
    'warning.secret.9',
    'warning.secret.10',
    'warning.secret.11',
    'warning.secret.12',
    'warning.secret.13',
    'warning.secret.14',
    'warning.secret.15',
    'warning.secret.16',
    'warning.secret.17',
    'warning.secret.18',
    'warning.secret.19',
    'warning.secret.20',
    'warning.secret.21',
    'warning.secret.22',
    'warning.secret.23',
    'warning.secret.24',
    'warning.secret.25',
    'warning.secret.26',
    'warning.secret.27',
    'warning.secret.28',
    'warning.secret.29',
    'warning.secret.30',
    'warning.secret.31',
    'warning.secret.32',
    'warning.secret.33',
    'warning.secret.34',
    'warning.secret.35',
    'warning.secret.36',
    'warning.secret.37'
];

const $FakePlayer = Java.tryLoadClass('net.minecraftforge.common.util.FakePlayer');

EntityEvents.hurt( event => {
    if(event.entity.type == 'minecraft:pig' && checkForPlayer(event.source.player))
    {
        event.source.player.tell(Text.translate(warnings[getRandom(0, warnings.length - 1)]));
    }
});

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkForPlayer(player) {
    if($FakePlayer == null) {
        return player != null;
    }

    return player != null && !(player instanceof $FakePlayer);
}