import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

import styles from './styles';
import { colorresource } from '../../resources/colorresource';
import { fontresource } from 'app/resources/fontresource';

const ELLIPSIZED_TITLE_LENGTH = 12;

const ellipsize = (string) => {
  if(string.length > ELLIPSIZED_TITLE_LENGTH + 3) {
    return string.substring(0, ELLIPSIZED_TITLE_LENGTH) + '...';
  }
  return string;
}

const parseAmount = (amount, precision = 2, defValue = 0) => {
  const parsed = parseFloat(amount);
  if(Number.isNaN(parsed) || parsed === 0) {
    return defValue;
  }
  return parsed.toFixed(precision)
}

export default ({single, data}) => {
  getDesignType = () => {
    if(single) {
      return '(Single Design)';
    } else {
      return '(Full Catalog)';
    }
  }
  const prod0 = data.products[0];
  const isFull = data.is_full_catalog; // also means that it is NOT a set
  const isSingle = !isFull;
  const isSet = prod0.product_type === 'set';
  const isCatalog = !isSet;
  const cTitle = ellipsize(isFull? data.catalog_title : prod0.product_title); // the name next to which we have to show the price
  const cSubTitle = isFull? '' : data.catalog_title;
  const cPcs = isFull? data.total_products : prod0.no_of_pcs;
  const cProductPrice = parseAmount(data.catalog_amount);  // excluding taxes
  const cSingleFullCatalog = isFull? 'Full Catalog' : 'Single Design';
  const cNote = prod0.note;
  const cTotalAmount = parseAmount(data.catalog_total_amount); // including taxes
  const cDiscountPercent = parseAmount(prod0.discount_percent, 1);
  const cDiscountAmount = parseAmount(data.catalog_discount);
  const cTaxPercent1 = data.catalog_tax_class_1_percentage;
  const cTaxAmount1 = parseAmount(data.catalog_tax_value_1);
  const cTaxPercent2 = data.catalog_tax_class_2_percentage;
  const cTaxAmount2 = parseAmount(data.catalog_tax_value_2);

  return (
    <View style={styles.InvoiceBreakupItemParent}>
      
      {/* <View style={styles.InvoiceBreakupItemEntry}>
        <View>
          <Text style={[styles.InvoiceBreakupItemEntryText]}>Supplier name</Text>
        </View>
        <View>
          <Text style={[styles.InvoiceBreakupItemEntryText]}>Dg Fashion</Text>
        </View>
      </View> */}

      {cSubTitle ? 
      <View style={styles.InvoiceBreakupItemEntry}>
        <View>
          <Text style={[styles.InvoiceBreakupItemEntryText, {color: colorresource.liteblack, fontFamily: fontresource.medium}]}>{'From ' + cSubTitle}</Text>
        </View>
        <View>
          
        </View>
      </View>
      : null}

      <View style={styles.InvoiceBreakupItemEntry}>
        <View>
          <Text style={[styles.InvoiceBreakupItemEntryText, {color: colorresource.liteblack, fontFamily: fontresource.medium}]}>{`${cTitle} (${cPcs} Pcs.)`}</Text>
        </View>
        <View>
          <Text style={[styles.InvoiceBreakupItemEntryText, {color: colorresource.gray, fontFamily: fontresource.medium}]}>{'\u20B9 ' + cProductPrice}</Text>
        </View>
      </View>

      <View style={styles.InvoiceBreakupItemEntry}>
          <Text style={[styles.InvoiceBreakupItemEntryText, {color: colorresource.gray,}]}>{`(${cSingleFullCatalog})`}</Text>
      </View>

      {cNote?
      <View style={styles.InvoiceBreakupItemEntry}>
          <Text style={[styles.InvoiceBreakupItemEntryText, {color: colorresource.darkred}]}>{cNote}</Text>
      </View>
      : null }

      {cDiscountPercent?
        <View style={styles.InvoiceBreakupPercentItemEntry}>
          <View style={styles.InvoiceBreakupPercentItemLeft}>
            <Text style={[styles.InvoiceBreakupItemEntryText, {color: colorresource.darkgreen, textAlign: 'right'}]}>{`Discount (${cDiscountPercent}%):`}</Text>
          </View>
          <View style={styles.InvoiceBreakupPercentItemRight}>
            <Text style={[styles.InvoiceBreakupItemEntryText, {color: colorresource.liteblack, textAlign: 'right'}]}>- {'\u20B9 ' + cDiscountAmount}</Text>
          </View>
        </View>
      : null }

      {cTaxAmount1?
        <View style={styles.InvoiceBreakupPercentItemEntry}>
          <View style={styles.InvoiceBreakupPercentItemLeft}>
            <Text style={[styles.InvoiceBreakupItemEntryText, {color: colorresource.gray, textAlign: 'right'}]}>{`SGST (${cTaxPercent1}%):`}</Text>
          </View>
          <View style={styles.InvoiceBreakupPercentItemRight}>
            <Text style={[styles.InvoiceBreakupItemEntryText, {color: colorresource.gray, textAlign: 'right'}]}>+ {'\u20B9 ' + cTaxAmount1}</Text>
          </View>
        </View>
      : null }

      {cTaxAmount2?
        <View style={styles.InvoiceBreakupPercentItemEntry}>
          <View style={styles.InvoiceBreakupPercentItemLeft}>
            <Text style={[styles.InvoiceBreakupItemEntryText, {color: colorresource.gray, textAlign: 'right'}]}>{`CGST (${cTaxPercent2}%):`}</Text>
          </View>
          <View style={styles.InvoiceBreakupPercentItemRight}>
            <Text style={[styles.InvoiceBreakupItemEntryText, {color: colorresource.gray, textAlign: 'right'}]}>+ {'\u20B9 ' + cTaxAmount2}</Text>
          </View>
        </View>
      : null }

      <View style={styles.InvoiceBreakupPercentItemEntry}>
        <View style={styles.InvoiceBreakupPercentItemLeft}>
          <Text style={[styles.InvoiceBreakupItemEntryText, {fontFamily: fontresource.medium, textAlign: 'right'}]}>Total:</Text>
        </View>
        <View style={styles.InvoiceBreakupPercentItemRight}>
          <Text style={[styles.InvoiceBreakupItemEntryText, {fontFamily: fontresource.medium, textAlign: 'right'}]}>{'\u20B9 ' + cTotalAmount}</Text>
        </View>
      </View>

    </View>
  );
}

