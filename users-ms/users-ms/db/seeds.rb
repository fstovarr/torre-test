# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Company.create name: "C", email: "c@c.com", password: "12345678", username: "c"
User.create name: "U", email: "u@c.com", password: "12345678", username: "u"
HeadHunter.create name: "H", email: "h@c.com", password: "12345678", username: "h"