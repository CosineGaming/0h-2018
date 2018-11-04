var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config)

var cursors
var space
var games

var player

var mode = 'random'

function preload() {
    this.load.image('player', 'assets/player.png')
    this.load.image('bg', 'assets/level-0-bg.png')
    cursors = this.input.keyboard.createCursorKeys()
    space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    games = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V)
}

function create() {
    this.add.image(400, 300, 'bg')
    this.add.text(10, 10, 'get to the target\nyou, like me, have little control over your actions\npress space to go faster\npress v to play video games',
        { fontSize: '15px', fill: '#fff', stroke: '#000' })

    player = this.physics.add.sprite(400, 300, 'player')
    player.setCollideWorldBounds(true)
}

var speed = 15
var angle = 0
var playingGames = 0
function update() {
    // Controls / modal
    if (mode == 'random') {
        // Do the random motion
        var variance = 3
        speed += variance * 2 * Math.random() - variance
        var angleVariance = 0.3
        angle += angleVariance * 2 * Math.random() - angleVariance
        // Controls tho
        var actualSpeed = speed
        if (space.isDown) {
            actualSpeed *= 5
        }
        if (games.isDown) {
            // This is probably FPS dependent but whatever
            playingGames = 750 * Math.random()
            console.log('vid games')
        }
        playingGames -= 1
        if (playingGames > 0) {
            actualSpeed = 0
        }
        player.setVelocity(Math.cos(angle) * actualSpeed, Math.sin(angle) * actualSpeed)
    }

    // other Game logic
    if (player.x > 740 && player.y > 540) {
        console.log('winnnnner')
        this.add.text(300, 300, 'you win!!!', { fontSize: '60px', fill: '#fff' })
    }
    console.log(player.x)
}

