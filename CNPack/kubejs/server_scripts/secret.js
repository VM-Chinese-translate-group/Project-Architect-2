const warnings = [
    'tooltip.secret.warning.1',
    'tooltip.secret.warning.2',
    'tooltip.secret.warning.3',
    'tooltip.secret.warning.4',
    'tooltip.secret.warning.5',
    'tooltip.secret.warning.6',
    'tooltip.secret.warning.7',
    'tooltip.secret.warning.8',
    'tooltip.secret.warning.9',
    'tooltip.secret.warning.10',
    'tooltip.secret.warning.11',
    'tooltip.secret.warning.12',
    'tooltip.secret.warning.13',
    'tooltip.secret.warning.14',
    'tooltip.secret.warning.15',
    'tooltip.secret.warning.16',
    'tooltip.secret.warning.17',
    'tooltip.secret.warning.18',
    'tooltip.secret.warning.19',
    'tooltip.secret.warning.20',
    'tooltip.secret.warning.21',
    'tooltip.secret.warning.22',
    'tooltip.secret.warning.23',
    'tooltip.secret.warning.24',
    'tooltip.secret.warning.25',
    'tooltip.secret.warning.26',
    'tooltip.secret.warning.27',
    'tooltip.secret.warning.28',
    'tooltip.secret.warning.29',
    'tooltip.secret.warning.30',
    'tooltip.secret.warning.31',
    'tooltip.secret.warning.32',
    'tooltip.secret.warning.33',
    'tooltip.secret.warning.34',
    'tooltip.secret.warning.35',
    'tooltip.secret.warning.36',
    'tooltip.secret.warning.37'
];

const $FakePlayer = Java.tryLoadClass('net.minecraftforge.common.util.FakePlayer');

EntityEvents.hurt(event => {
    if (event.entity.type == 'minecraft:pig' && checkForPlayer(event.source.player)) 
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
    if ($FakePlayer == null) {
        return player != null;
    }

    return player != null && !(player instanceof $FakePlayer);
}