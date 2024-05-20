import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Vazir",
  src: "/fonts/Vazirmatn-Medium.ttf", // مسیر صحیح به فایل فونت در پروژه شما
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    fontFamily: "Vazir",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 50,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#000",
    paddingBottom: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  rowEven: {
    backgroundColor: "#f0f0f0",
  },
  rowOdd: {
    backgroundColor: "#ffffff",
  },
  boldText: {
    fontWeight: "bold",
  },
});

const FacturePdf = ({ orderDetails }) => (
  <Document>
    <Page size="A4">
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text>شماره فاکتور: {orderDetails?.productsDetails.id}</Text>
            <Text>تاریخ: 1403/02/22</Text>
          </View>
          <Image src="/images/logo-1.png" style={styles.image} />
        </View>

        <View style={styles.section}>
          <View>
            <Text>
              نام و نام خانوادگی:{" "}
              {`${orderDetails?.productsDetails.name} ${orderDetails?.productsDetails.lastName}`}
            </Text>
          </View>
          <View>
            <Text>ایمیل: {orderDetails?.productsDetails.email}</Text>
          </View>
          <View>
            <Text>شماره تماس: {orderDetails?.productsDetails.mobile}</Text>
          </View>
          <View>
            <Text>
              آدرس:{" "}
              {`${orderDetails?.productsDetails.province}-${orderDetails?.productsDetails.city}-${orderDetails?.productsDetails.location}`}
            </Text>
          </View>
          <View>
            <Text>کد پستی: {orderDetails?.productsDetails.PostalCode}</Text>
          </View>
        </View>

        <View>
          <View
            style={[
              styles.row,
              styles.boldText,
              { borderBottomWidth: 1, borderColor: "#000", paddingBottom: 5 },
            ]}
          >
            <Text>ردیف</Text>
            <Text>نام کالا</Text>
            <Text>تعداد</Text>
            <Text>قیمت</Text>
            <Text>قیمت کل</Text>
          </View>
          {orderDetails?.productsDetails.selectedItems.map((product, index) => (
            <View
              key={product.id}
              style={[
                styles.row,
                index % 2 === 0 ? styles.rowEven : styles.rowOdd,
              ]}
            >
              <Text>{index + 1}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  src={`/images/${product.image}`}
                  style={{ width: 50, height: 50 }}
                />
                <Text>{product.title}</Text>
              </View>
              <Text>{product.quantity}</Text>
              <Text>{product.price} تومان</Text>
              <Text>{product.price * product.quantity} تومان</Text>
            </View>
          ))}
          <View
            style={[
              styles.row,
              { backgroundColor: "#eee", paddingVertical: 5 },
            ]}
          >
            <Text>تعداد کل محصولات: {orderDetails?.itemCounter}</Text>
            <Text>جمع کل: {orderDetails?.total?.toLocaleString()} تومان</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default FacturePdf;
