# Copyright 2021 Kidus Tiliksew

# This file is part of Tensor EMR.

# Tensor EMR is free software: you can redistribute it and/or modify
# it under the terms of the version 2 of GNU General Public License as published by
# the Free Software Foundation.

# Tensor EMR is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

VERSION := 1.0.0

build-image:
	docker build -t docker.tensorsystems.net/tensoremr/webclient:$(VERSION) .

build-and-push:
	build-image
	docker tag docker.tensorsystems.net/tensoremr/webclient:latest us-central1-docker.pkg.dev/tensor-systems/tensor-emr/webclient:latest
	docker push us-central1-docker.pkg.dev/tensor-systems/tensor-emr/web-client:$(VERSION)

push-image:
	docker tag docker.tensorsystems.net/tensoremr/webclient:latest us-central1-docker.pkg.dev/tensor-systems/tensor-emr/webclient:latest
	docker push us-central1-docker.pkg.dev/tensor-systems/tensor-emr/webclient:$(VERSION)