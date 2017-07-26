function warrior(name, atkDamage, defense, hitPoints) {
  this.name = name,
    this.atkDamage = atkDamage,
    this.defense = defense,
    this.hitPoints = hitPoints,
    this.attackEnemy = function(enemy) {
      if (this.hitPoints > 0) {
        if (this.atkDamage - enemy.defense) {
          enemy.hitPoints -= this.atkDamage - enemy.defense;
        }
        $(".fightlog").append("<p class='warrior'>" + this.name + " attacks " + enemy.name + " for " + (this.atkDamage - enemy.defense) + " damage.</p>");
        this.autoScroll();
      }
    },
  this.displayWarrior = function(target) {
      Object.values(this).forEach(function(elem, index) {
        $(target).eq(index).text(elem);
      });
    },
    this.autoScroll = function() {
      $(".fightlog").animate({
        scrollTop: $(".fightlog").get(0).scrollHeight
      }, 200);
    }
}

function warlock(name, atkDamage, defense, hitPoints, manaPoints) {
  this.name = name,
    this.atkDamage = atkDamage,
    this.defense = defense,
    this.hitPoints = hitPoints,
    this.manaPoints = manaPoints,
    this.healSelf = function() {
      if (this.manaPoints >= 10) {
        this.manaPoints -= 10;
        this.hitPoints += 10;
      }
    },
    this.attackEnemy = function(enemy1, enemy2) {
      if (this.hitPoints > 0) {
        if (this.manaPoints > 10 && this.hitPoints <= 5) {
          this.manaPoints -= 10;
          this.hitPoints += 10;
          $(".fightlog").append("<p class='warlock'>" + this.name + " heals himself for 10 hitpoints.</p>");
          this.autoScroll();
        }
        enemy = Math.floor(Math.random() * 2) ? enemy1 : enemy2;
        if (this.atkDamage - enemy.defense > 0) {
          enemy.hitPoints -= this.atkDamage - enemy.defense;
          $(".fightlog").append("<p class='warlock'>" + this.name + " attacks " + enemy.name + " for " + (this.atkDamage - enemy.defense) + " damage.</p>");
        }
        else {
          $(".fightlog").append("<p class='warlock'>" + this.name + " attacks " + enemy.name + " for 0 damage.</p>");
        }
        this.autoScroll();
      }
    },
    this.displayWarlock = function(target) {
      Object.values(this).forEach(function(elem, index) {
        $(target).eq(index).text(elem);
      });
    },
    this.autoScroll = function() {
      $(".fightlog").animate({
        scrollTop: $(".fightlog").get(0).scrollHeight
      }, 200);
    }
}


var warrior1 = new warrior("Grobill", 5, 2, 15),
  warrior2 = new warrior("Billou", 4, 3, 15),
  warlock1 = new warlock("Mago", 5, 2, 15, 25),
  i = 0;


function displayAll() {
  warlock1.displayWarlock(".wl p span");
  warrior1.displayWarrior(".w1 p span");
  warrior2.displayWarrior(".w2 p span");
}


$("button").click(function() {
  if (i % 2) {
    warrior1.attackEnemy(warlock1);
    warrior2.attackEnemy(warlock1);
    displayAll();
  } else {
    warlock1.attackEnemy(warrior1, warrior2);
    displayAll();
  }
  i++;
});

displayAll();
