import React from 'react';
import {StyleSheet, View} from 'react-native';

//components
import BulletSvg from '../../assets/svg/bullet.svg';
import BulletSvgEmpty from '../../assets/svg/bullet-empty.svg';

function Bullet({bulletFilled}: {bulletFilled: boolean}) {
  return bulletFilled ? (
    <BulletSvg style={styles.bullet} />
  ) : (
    <BulletSvgEmpty style={styles.bullet} />
  );
}

function ScheduleBullets({
  numberOfBullets,
  bulletsToBeFilled,
  style,
}: {
  numberOfBullets: number;
  bulletsToBeFilled: number;
  style?: Object;
}) {
  const bullets = [];

  for (let i = 0; i < numberOfBullets; i++) {
    if (i < bulletsToBeFilled) {
      bullets.unshift(<Bullet bulletFilled={false} key={i} />);
    } else {
      bullets.unshift(<Bullet bulletFilled={true} key={i} />);
    }
  }
  return <View style={{...styles.container, ...style}}>{bullets}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bullet: {
    marginHorizontal: 4,
  },
});

export default ScheduleBullets;
