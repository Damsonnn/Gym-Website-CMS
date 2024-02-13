INSERT INTO banner (title, body, active) VALUES 
    ("Tytuł banera", "Bardzo fajna treść banera.", TRUE),
    ("Testowy baner", "Bardzo elegancki testowy baner", TRUE),
    ("Ostatni test", "To już ostatni baner do wytestowania tej funkcjonalności", FALSE);

INSERT INTO category (name, active) VALUES
    ("Trening siłowy", TRUE),
    ("Bieganie", TRUE),
    ("Joga", FALSE);

INSERT INTO location (city, address, phone_number, email) VALUES
    ("Gniezno", "Poznańska 1/1", "+48800800800", "email.service1605@gmail.com"),
    ("Poznań", "Gnieźnieńska 1/1", "600600600", "test@example.com"),
    ("Warszawa", "Warszawska 1/1", "100100100", "warszawa@example.com");

INSERT INTO offer (name, price, body, discount, active) VALUES
    ("Pakiet normalny", 100, "", 10, TRUE),
    ("Pakiet premium", 200, "", 15, TRUE),
    ("Pakiet jestem za bogaty", 450, "", 0, FALSE);

INSERT INTO opinon (author, body, active) VALUES 
    ("Damian Ćwikliski", "Najlepsza sieć siłowni w Polsce, polecam i pozdrawiam", TRUE),
    ("Jakiś Gość", "Kupiłem karnet i 50kg mięśni samo się pojawiło", TRUE),
    ("Maciej", "Ok", FALSE);

INSERT INTO post (title, body, active, author, category_id) VALUES
    ("Super post", "", TRUE, "Damian", 1),
    ("Nowy post", "", TRUE, "Damian", 1),
    ("3 sposoby na coś", "", TRUE, "Damian", 2);

INSERT INTO trainer (first_name, last_name, age, about, facebook_link, instagram_link, twitter_link, active)
    ("Damian", "Ćwikliński", 24, "", "www.facebook.com", "www.instagram.com", "www.twitter.com", TRUE),
    ("Pan", "Miyagi", 65, "", "www.facebook.com", "", "www.twitter.com", TRUE),
    ("Trener", "Natural", 40, "", "www.facebook.com", "www.instagram.com", "www.twitter.com", FALSE);
