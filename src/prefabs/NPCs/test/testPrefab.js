export default class NpcPrefab extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(1.0); 

        this.speed = 25;

        this.route = [
           { x: 1350, y: 395 },
           { x: 1350, y: 165 },
           { x: 700, y: 165 },
           { x: 1350, y: 165 },
           { x: 1350, y: 395 },
           { x: 650, y: 395 }

        ];

        this.currentTargetIndex = 0;
        this.target = this.route[this.currentTargetIndex];
    }

    update() {
        if (!this.target) return;

        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 4) {
            // Chegou ao ponto atual, vai para o próximo
            this.currentTargetIndex = (this.currentTargetIndex + 1) % this.route.length;
            this.target = this.route[this.currentTargetIndex];
            return;
        }

        const angle = Math.atan2(dy, dx);
        const vx = Math.cos(angle) * this.speed;
        const vy = Math.sin(angle) * this.speed;

        this.setVelocity(vx, vy);

        if (Math.abs(dx) > Math.abs(dy)) {
            if (vx > 0) this.play('npc1-move-right', true);
            else this.play('npc1-move-left', true);
        } else {
            if (vy > 0) this.play('npc1-move-down', true);
            else this.play('npc1-move-up', true);
        }
    }
}
