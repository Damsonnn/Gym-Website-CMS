INSERT INTO banner (title, body, active) VALUES 
    ('Title of banner', 'Really nice banner content.', TRUE),
    ('Test banner', 'Very elegant test banner', TRUE),
    ('Last banner test', 'Its the last test of this functionality', FALSE);

INSERT INTO category (name, active) VALUES
    ('Strength training', TRUE),
    ('Running', TRUE),
    ('Yoga', FALSE);

INSERT INTO location (city, address, phone_number, email) VALUES
    ('Gniezno', 'Poznanska 1/1', '800800800', 'email.service1605@gmail.com'),
    ('Poznan', 'Gnieznieńska 1/1', '600600600', 'test@example.com'),
    ('Warszawa', 'Warszawska 1/1', '100100100', 'warszawa@example.com');

INSERT INTO offer (name, price, body, discount, active) VALUES
    ('Normal', 100, '', 10, TRUE),
    ('Premium', 200, '', 15, TRUE),
    ('Im really rich', 450, '', 0, FALSE);

INSERT INTO opinion (author, body, active) VALUES 
    ('Damian Cwikliski', 'Best gym ever', TRUE),
    ('Jakiś Gość', 'I bought a carnet and gained 50kg of muscles in a week', TRUE),
    ('Maciej', 'Ok', FALSE);

INSERT INTO post (title, body, active, author, category_id) VALUES
    ('Nice post', '', TRUE, 'Damian', 1),
    ('New post', '', TRUE, 'Damian', 2),
    ('3 ways to gain strenght', '', TRUE, 'Damian', 1);

INSERT INTO trainer (first_name, last_name, age, about, facebook_link, instagram_link, twitter_link, active) VALUES
    ('Damian', 'Cwiklinski', 24, '', 'www.facebook.com', 'www.instagram.com', 'www.twitter.com', TRUE),
    ('Mister', 'Miyagi', 65, '', 'www.facebook.com', '', 'www.twitter.com', TRUE),
    ('Trainer', 'Natural', 40, '', 'www.facebook.com', 'www.instagram.com', 'www.twitter.com', FALSE);
