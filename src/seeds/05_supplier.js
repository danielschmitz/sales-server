exports.seed = async function (knex) {
  console.log("seed suppliers")
  await knex("suppliers").del()
  const addressesId = await knex("addresses").insert({
    street: "Street Test",
    city: "City Test",
    region: "Region Test",
    postalCode: "Postal Test",
    country: "Country Test",
    phone: "111 222 Test",
  })

  return knex("suppliers").insert({
    companyName: "Company Test",
    contactName: "Contact Test",
    contactEmail: "Email Test",
    address_id: addressesId[0],
  })
}
