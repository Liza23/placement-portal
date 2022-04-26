run:
	python3 generate_data.py
	sudo cp -r data/ /var/lib/postgresql/project-data/
	sudo cp DDL.sql /var/lib/postgresql/
	sudo cp insert_data.py /var/lib/postgresql/

clean:
	rm -f *.csv *.tsv
	sudo rm -rf /var/lib/postgresql/project-data/
	sudo rm -f /var/lib/postgresql/DDL.sql
	sudo rm -f /var/lib/postgresql/insert_data.py
