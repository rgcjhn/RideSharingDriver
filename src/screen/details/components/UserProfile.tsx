import { Entypo } from "@expo/vector-icons";
import Content from "components/Content";
import { useAppSelector } from "hooks";
import moment from "moment";
import React, { memo } from "react";
import { Image, StyleSheet, View } from "react-native";
import R from "res/R";

type Props = {
  ride: Ride;
};

const UserProfile = ({ ride }: Props) => {
  const user = useAppSelector((s) =>
    s.users.find((user) => user.id === ride.userId)
  );

  console.log(moment());

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: "https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_1280.png",
        }}
      />
      <View style={styles.profile}>
        <Content>{user?.name}</Content>
        <Content>
          <Entypo name="globe" color={R.colors.faded} size={12} />
          &nbsp;
          <Content style={styles.date}>
            {moment(ride.timestamp).fromNow()}
          </Content>
        </Content>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 18,
    marginTop: 18,
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 4,
  },
  profile: {
    marginLeft: 12,
    marginTop: 4,
  },
  date: {
    fontSize: 13,
    marginLeft: 4,
    color: R.colors.faded,
  },
});

export default memo(UserProfile);
