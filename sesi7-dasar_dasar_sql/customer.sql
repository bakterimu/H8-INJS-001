create table customer (
	id_customer integer,
	nama varchar,
	jenis_kelamin char,
	barang varchar,
	hobby varchar
);

insert into "customer" (id_customer, nama, jenis_kelamin, barang, hobby) 
values
(1, 'Izhar', 'L', 'Mouse', 'Bermain Bola'),
(2, 'Mayranda', 'L', 'Ciki', 'Bermain Gitar'),
(3, 'Ilham', 'L', 'Buku', 'Membaca'),
(4, 'Kania' 'P', 'Gitar', 'Memasak'),
(5, 'Sasha', 'P', 'Air Mineral', 'Menyanyi'); 

update customer
set hobby = 'Menari',
	barang = 'Sabun'
where id_customer = 5;

select * from customer
WHERE
	id_customer BETWEEN 2 and 5;