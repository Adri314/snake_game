namespace SpriteKind {
    export const Tail = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(direction == "down")) {
        direction = "up"
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Tail, function (sprite, otherSprite) {
    game.over(false)
})
function moveApple () {
    apple.setPosition(4 + randint(0, 19) * 8, 4 + randint(0, 14) * 8)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(direction == "right")) {
        direction = "left"
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(direction == "left")) {
        direction = "right"
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(direction == "up")) {
        direction = "down"
    }
})
function setupSnake () {
    snake = sprites.create(img`
        c c c c c c c c 
        c c c c c c c c 
        c c c c 1 1 c c 
        c c c c 1 1 c c 
        c c c c c c c c 
        c c c c c c c c 
        c c c c c c c c 
        c c c c c c c c 
        `, SpriteKind.Player)
    snake.setPosition(52, 60)
    tailParts = []
    for (let index = 0; index <= 3; index++) {
        tailPart = sprites.create(img`
            c c c c c c c c 
            c c c c c c c c 
            c c c c c c c c 
            c c c c c c c c 
            c c c c c c c c 
            c c c c c c c c 
            c c c c c c c c 
            c c c c c c c c 
            `, SpriteKind.Tail)
        tailPart.x = snake.x + (index + 1) * 8
        tailParts.push(tailPart)
    }
    direction = "left"
}
let tailPart: Sprite = null
let tailParts: Sprite[] = []
let snake: Sprite = null
let direction = ""
let apple: Sprite = null
scene.setBackgroundColor(13)
apple = sprites.create(img`
    2 2 2 2 2 2 
    2 2 2 2 2 2 
    2 2 2 2 2 2 
    2 2 2 2 2 2 
    2 2 2 2 2 2 
    2 2 2 2 2 2 
    `, SpriteKind.Food)
apple.setPosition(4 + randint(0, 19) * 8, 4 + randint(0, 14) * 8)
moveApple()
setupSnake()
game.onUpdateInterval(500, function () {
    tailPart = sprites.create(img`
        c c c c c c c c 
        c c c c c c c c 
        c c c c c c c c 
        c c c c c c c c 
        c c c c c c c c 
        c c c c c c c c 
        c c c c c c c c 
        c c c c c c c c 
        `, SpriteKind.Tail)
    if (direction == "left") {
        snake.setImage(img`
            c c c c c c c c 
            c c c c c c c c 
            c c c c 1 1 c c 
            c c c c 1 1 c c 
            c c c c c c c c 
            c c c c c c c c 
            c c c c c c c c 
            c c c c c c c c 
            `)
        snake.x += -8
        tailPart.x = snake.x + 8
        tailPart.y = snake.y
    } else if (direction == "right") {
        snake.setImage(img`
            c c c c c c c c 
            c c c c c c c c 
            c c 1 1 c c c c 
            c c 1 1 c c c c 
            c c c c c c c c 
            c c c c c c c c 
            c c c c c c c c 
            c c c c c c c c 
            `)
        snake.x += 8
        tailPart.x = snake.x - 8
        tailPart.y = snake.y
    } else if (direction == "up") {
        snake.setImage(img`
            c c c c c c c c 
            c c c c c c c c 
            c c c c c c c c 
            c c c c c c c c 
            c c c c 1 1 c c 
            c c c c 1 1 c c 
            c c c c c c c c 
            c c c c c c c c 
            `)
        snake.y += -8
        tailPart.y = snake.y + 8
        tailPart.x = snake.x
    } else if (direction == "down") {
        snake.setImage(img`
            c c c c c c c c 
            c c c c c c c c 
            c c c c c c c c 
            c c c c c c c c 
            c c 1 1 c c c c 
            c c 1 1 c c c c 
            c c c c c c c c 
            c c c c c c c c 
            `)
        snake.y += 8
        tailPart.y = snake.y - 8
        tailPart.x = snake.x
    }
    tailParts.unshift(tailPart)
    if (snake.overlapsWith(apple)) {
        moveApple()
    } else {
        tailParts.pop().destroy()
    }
})
