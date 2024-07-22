import React, { useState } from "react";
import { Button, DatePicker, Input, Space } from "antd";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

const InternShip = () => {
  const [shareholders, setShareholders] = useState([
    { name: "", address: "", date: "" },
    { name: "", address: "", date: "" },
  ]);

  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>SHAREHOLDERS AGREEMENT</Text>
          <Text style={styles.parties}>
            PARTIES
            {"\n"}- This Shareholders Agreement (hereinafter referred to as the
            “Agreement”) is entered into on {shareholders[0].date} (the
            “Effective Date”), by and between the following:
            {"\n"}
            Shareholder’s name Address
            {"\n"}
            {shareholders
              .map(({ name, address }) => `${name} ${address}`)
              .join("\n")}
            {"\n"}
            (collectively referred to as the “Shareholders”).
          </Text>
        </View>
      </Page>
    </Document>
  );

  const handleInputChange = (index, field, value) => {
    const newShareholders = [...shareholders];
    newShareholders[index][field] = value;
    setShareholders(newShareholders);
  };

  const handleDownload = () => {
    const filename = "ShareholdersAgreement.pdf";

    // Render PDF to a Blob
    const blob = new Blob([<MyDocument />], { type: "application/pdf" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary <a> element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div>
      {shareholders.map((shareholder, index) => (
        <div key={index}>
          <Input
            placeholder="Shareholder's Name"
            value={shareholder.name}
            onChange={(e) => handleInputChange(index, "name", e.target.value)}
          />
          <Input
            placeholder="Address"
            value={shareholder.address}
            onChange={(e) =>
              handleInputChange(index, "address", e.target.value)
            }
          />
          <Space direction="vertical">
            <DatePicker
              placeholder="Date"
              value={shareholder.date}
              onChange={(date) => handleInputChange(index, "date", date)}
            />
          </Space>
        </div>
      ))}
      <Button type="primary" onClick={handleDownload}>
        Download Agreement
      </Button>
      {/* <PDFViewer width="1000" height="600">
        <MyDocument />
      </PDFViewer> */}
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  parties: {
    fontSize: 12,
    marginBottom: 10,
  },
});

export default InternShip;
