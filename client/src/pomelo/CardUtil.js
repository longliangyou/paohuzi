var CardUtil = {};

// 组牌
// example: [75, 13, 5, 28, 35, 54, 22, 19, 62, 51, 3, 42, 59, 79, 73, 24, 57, 10, 58, 44]
// =>
// [
//   Array[2],
//   Array[2],
//   Array[2],
//   Array[2],
//   Array[2],
//   Array[2],
//   Array[3],
//   Array[3],
//   Array[2]
// ]
CardUtil.riffle = function(cards) {
  var riffledCards = [];

  var bigCards = [];
  var smallCards = [];

  // 0 标记牌
  _.each(cards, function(card){
    if (card > 40){
      bigCards.push(card);
    } else {
      smallCards.push(card);
    }
  });


  // 1 相同的牌一组
  var bigGroup = _.groupBy(bigCards, function(card){
    var number = card % 10;
    if (number === 0){
      number = 10;
    }
    return number;
  });

  var smallGroup = _.groupBy(smallCards, function(card){
    var number = card % 10;
    if (number === 0){
      number = 10;
    }
    return number;
  });

  var restCards = [];
  _.each(bigGroup, function(value, key){
    if (value.length > 1){
      riffledCards.push(value);
    }else{
      restCards.push(value[0]);
    }
  });
  _.each(smallGroup, function(value, key){
    if (value.length > 1){
      riffledCards.push(value);
    }else{
      restCards.push(value[0]);
    }
  });

  var tempCards = [];
  var restGroup = _.groupBy(restCards, function(card){return card % 10;});
  _.each(restGroup, function(value, key){
    if (value.length > 1){
      riffledCards.push(value);
    }else{
      tempCards.push(value[0]);
    }
  });


  // 2 按顺序相邻3张一组。
  var group1 = [];
  var group2 = [];
  var group3 = [];
  _.each(tempCards, function(card){
    number = card % 10;
    if (number === 0){
      number = 10;
    }
    if (number < 4){
      group1.push(card);
    }else if (number > 6 ){
      group2.push(card);
    } else {
      group3.push(card);
    }
  });

  riffledCards.push(group1);
  riffledCards.push(group2);
  riffledCards.push(group3);
  riffledCards = _.reject(riffledCards, function (group){
    return !group.length;
  });
  return riffledCards;
};